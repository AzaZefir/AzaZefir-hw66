const url = 'https://api.github.com/users/'

const {
    Subject,
    Observable
} = rxjs;

let btn = document.querySelector('button').addEventListener('click', handler => {
    const userInfo = document.querySelector('#user')
    const http$ = new Subject()

    http$.subscribe(
        data => {
            console.log(data)
            let div = document.createElement('div')
            div.innerHTML = `
            <div>
            <span>
            <p>name</p>
            <p>${data.name}</p>
            </span>
            <hr>
            <span>
            <p>email</p>
            <p>${data.email}</p>
            </span>
            <hr>
            <span>
            <p>company</p>
            <p>${data.company}</p>
            </span>
            <hr>
            <span>
            <p>location</p>
            <p>${data.location}</p>
            </span>
            <hr>
            <span>
            <p>repos</p>
            <p>${data.public_repos}</p>
            </span>
            <hr>
            <span>
            <p>foto</p>
            <p>${data.gravatar_id}</p>
            </span>
            </div>
            `
            document.body.appendChild(div);
        },
        fetch(`${url}` + `${userInfo}`)
        .then((reply) => {
            return reply.json()
        })
        .then(data => {
            http$.next(data)
            http$.complete()
        })
        .catch(err =>
            http$.error(err))
    )
})