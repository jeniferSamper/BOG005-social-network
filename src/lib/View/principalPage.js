
import { signOutCount, auth } from '../firebase/authFirebase.js';
import { savePost, onGetPosts, deletePost, getPost, updatePost } from '../firebase/configFirestore.js';
// import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

// export const principalPage = () => {
//     let principalPageContainer = document.createElement("div")
//     const principalPageTemplate =
//         `
//         <header class="headerContainer">
//         <button class="btnSignOut" onClick="signOutClick()">Cerrar Sesión</button>
//         </header>
//         <form class="formContainer" type="submit" id="formContainer">
//         <input id='titlePost' type='text' placeholder='Nombra tu receta...'>
//         <textarea id='inputPost' type='text' placeholder='Describe tu receta...' ></textarea>
//         </form>
//         <button class="btnPost" type='text' onclick="createPost()">Publicar</button>

//         `

//     principalPageContainer.innerHTML = principalPageTemplate


//     window.addEventListener('DOMContentLoaded', () => {
//         const querySnapshot = getPosts()
//         console.log(querySnapshot)
//     })


//     window.createPost = function () {
//         const titlePost = document.getElementById('titlePost').value;
//         const infoPost = document.getElementById('inputPost').value;

//         console.log('funciona el', infoPost, 'y el', titlePost);
//         savePost(titlePost, infoPost);
//         const formContainer = document.getElementById('formContainer')
//         formContainer.reset()
//     };

//     // const formContainer = document.getElementById('formContainer')

//     // formContainer.addEventListener("submit", (e) => {
//     //     e.preventDefault()
//     //     const titlePost = document.getElementById('titlePost').value;
//     //     const infoPost = document.getElementById('inputPost').value;
//     //     savePost(titlePost, infoPost);
//     // formContainer.reset()

//     // })


//     window.signOutClick = function () {
//         signOutCount();
//     };

//     return principalPageContainer
// }




export const principalPage = () => {

    const wall = document.createElement('div')
    wall.classList = 'wall'

    const header = document.createElement('header')
    header.classList = 'header'

    const imageLogo = document.createElement("img")
    imageLogo.classList = 'imageLogo'
    imageLogo.setAttribute('src', './images/logoHeader2.png');

    const imageTitle = document.createElement("img")
    imageTitle.classList = 'imageTitle'
    imageTitle.setAttribute('src', './images/kids_food.png');

    const btnSignOut = document.createElement("button")
    // btnSignOut.textContent = 'Cerrar Sesion'

    // btnSignOut.classList = <i class="fa-solid fa-right-from-bracket"></i>
    // carita para el like <i class="fa-solid fa-face-smile-tongue"></i>
    // carita para el like <i class="fa-sharp fa-solid fa-face-smile-tongue"></i>
    // basurero <i class="fa-solid fa-trash-can"></i>
    // editar <i class="fa-solid fa-pen-to-square"></i>

    btnSignOut.classList = 'btn_SignOut'

    const sectionContainer = document.createElement('section')
    sectionContainer.classList = 'sectionContainer'

    const formContainer = document.createElement('form')
    formContainer.classList = 'formContainer-principalPage'

    const titlePost = document.createElement('input')
    titlePost.classList = 'titlePost'
    titlePost.type = 'texto'
    titlePost.setAttribute('placeholder', 'Nombra tu receta...');
    titlePost.setAttribute('required', '');


    const inputPost = document.createElement('textarea');
    inputPost.classList = 'inputPost'
    inputPost.setAttribute('placeholder', 'Describe tu receta...')
    inputPost.setAttribute('required', '');


    const btnPost = document.createElement('button')
    btnPost.classList = 'btnPost'
    btnPost.textContent = 'Publicar'

    const postContainer = document.createElement('div')
    postContainer.classList = 'postContainer'

    const footer = document.createElement("footer")
    footer.classList = 'footer'


    // window.addEventListener('DOMContentLoaded', () => {
    //    onGetPosts(getPosts().then(res => {
    //         console.log('data', res);
    //         res.forEach((doc) => {
    //             console.log('este es el titulo del post', doc.title)
    //             console.log('este es la descripcion del post', doc.description)
    //             printPost(doc);
    //         })
    //     }))


    // })

    const printPost = (dataPost, dataId) => {
        const task = document.createElement('div');
        task.classList = 'task';

        const titleTask = document.createElement('h3');
        titleTask.classList = 'titleTask';
        titleTask.textContent = dataPost.title;

        const descriptionTask = document.createElement('p');
        descriptionTask.classList = 'descriptionTask';
        descriptionTask.textContent = dataPost.description;

        const btnDelete = document.createElement('button');
        btnDelete.classList = 'btnDelete';
        btnDelete.textContent = 'X';
        btnDelete.setAttribute('data-id', dataId)

        // <i class="fa-regular fa-circle-xmark"></i>

        const btnEdit = document.createElement('button');
        btnEdit.classList = 'btnEdit';
        btnEdit.textContent = 'Editar';
        btnEdit.setAttribute('data-id', dataId)

        // <i class="fa-solid fa-carrot"></i>
        // <i class="fa-solid fa-face-grin-hearts"></i>
        const btnLike = document.createElement('button');
        btnLike.className = 'btnLike';
        btnLike.appendChild(document.createElement('i')).classList.add("fa-solid", "fa-face-grin-hearts")
        btnLike.setAttribute('data-id', dataId)

        const inpuLikes = document.createElement('input')
        inpuLikes.className = 'inpuLikes'
        inpuLikes.setAttribute('value', 0)
        inpuLikes.setAttribute('data-id', dataId)

        task.append(titleTask, descriptionTask, btnLike, inpuLikes, btnEdit, btnDelete)
        return task
    }

    let editStatus = false;
    let idPost = '';
console.log(auth.email, 'auth.email');
    window.addEventListener('DOMContentLoaded', () => {
        // const querySnapshot = await getPosts();
        onGetPosts((querySnapshot) => {
            postContainer.innerHTML = ""
            let i = 0;
            console.log('query', querySnapshot);
            querySnapshot.forEach((infoPost) => {
                // console.log(i);
                const dataPost = infoPost.data()
                const dataId = infoPost.id
                postContainer.append(printPost(dataPost, dataId))
                i++;
            })

            const arrayDeleteBtn = postContainer.querySelectorAll('.btnDelete')
            //    console.log('botones',arrayBtn);
            arrayDeleteBtn.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    deletePost(event.target.dataset.id);
                })
            })

            const arrayEditBtn = postContainer.querySelectorAll('.btnEdit')
            arrayEditBtn.forEach(btn => {
                btn.addEventListener('click', async (event) => {
                    // console.log(event.target.dataset.id);
                    const dataEdit = await getPost(event.target.dataset.id)
                    // console.log('data edit', dataEdit.data());
                    const postEdit = dataEdit.data()
                    formContainer.querySelector('.titlePost').value = postEdit.title
                    formContainer.querySelector('.inputPost').value = postEdit.description

                    editStatus = true;
                    idPost = event.target.dataset.id
                    formContainer.querySelector('.btnPost').innerText = 'Editar'
                })
            })

            // const btnLikes = postContainer.querySelectorAll('.btnLike')
            // btnLikes.forEach(btn => {
            //     btn.addEventListener('click', (event) => {
            //         // console.log('funciona el btnLikes')
            //         event.target.classList.toggle('like-on')

            //         // funcion de conteo
            //         let inputLikesValue = document.querySelector('.inpuLikes').value
            //         console.log(inputLikesValue)
            //         inputLikesValue = parseInt(inputLikesValue) + 1
            //     })
            // })
            const btnLikes = postContainer.querySelectorAll('.btnLike')
            btnLikes.forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    // console.log('funciona el btnLikes')
                    event.target.classList.toggle('like-on')
                    // const postid = await getPost(event.target.dataset.id)
                    // // const postId = postid.data()
                    // // console.log(postid)
                    // idPost = event.target.dataset.id
                    // console.log('probando idPost', idPost)
                    // funcion de conteo
                    // const inputLikes = document.querySelector('.inpuLikes')
                    const inputLikes = document.getElementById()
                    
                    console.log(id);
                    if (event.target.classList.contains('like-on')) {
                        // console.log('sumar 1')
                        let contadorLikes = parseInt(inputLikes.value) + 1;
                        inputLikes.value = contadorLikes
                        // console.log('contador', contadorLikes)
                    } else {
                        // console.log('restar1')
                        let contadorLikes = parseInt(inputLikes.value) - 1;
                        inputLikes.value = contadorLikes
                        // console.log('restando', contadorLikes)
                    }
                    // console.log('probando el inputLikesValue')
                })
            })

            // console.log('post container',postContainer);
        })
    })

    // // aca toca traer lo que tenia mas lo nuevo
    btnPost.addEventListener("click", (e) => {
        e.preventDefault()
        const pruebatitulo = titlePost.value
        const pruebadesc = inputPost.value
        if (!editStatus) {
            savePost(pruebatitulo, pruebadesc);
        } else {
            updatePost(idPost, { title: titlePost.value, description: inputPost.value })
            editStatus = false;
        }

        formContainer.reset()
    })

    btnSignOut.addEventListener('click', () => {
        signOutCount();
    })

    header.append(imageLogo, imageTitle, btnSignOut)
    formContainer.append(titlePost, inputPost, btnPost)
    sectionContainer.append(formContainer, postContainer)
    wall.append(header, sectionContainer, footer)
    return wall
}


// window.addEventListener('DOMContentLoaded', () => {
//     // const querySnapshot = await getPosts();
//     // const querySnapshot = await getDocs(collection(db, "posts"));
//     // console.log(querySnapshot);
//     // querySnapshot.forEach((doc) => {
//     //     console.log(doc.data());
//     // });
//     const data = getPosts().then(res => {
//         console.log('data', res);
//         res.forEach((element) => {
//             // console.log('este es el titulo del post', doc.title)
//             // console.log('este es la descripcion del post', doc.description)
//             printPost(element);
//         })
//     });
// })

// export const printPost = (element) => {
//     const task = document.createElement('div');
//     task.classList = 'task'
//     const titleTask = document.createElement('h3');
//     titleTask.classList = 'titleTask'
//     titleTask.textContent = element.title
//     const descriptionTask = document.createElement('p');
//     descriptionTask.classList = 'descriptionTask'
//     descriptionTask.textContent = element.description

//     task.append(titleTask, descriptionTask)
//     const totalPost = document.getElementsByClassName('postContainer')
//     // totalPost.innerHTML = task
//     totalPost.append(task)
//     return totalPost
// }