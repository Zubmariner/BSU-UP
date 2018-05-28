const postRenderer = (function () {

    const postsContainer = document.getElementById('#posts-container');

    function renderPost(post) {
        const template = getTemplate(post);
        const modalTemplate = getModalTemplate(post);
        const postElement = getPostElement(template, modalTemplate, post.id);
        postsContainer.appendChild(postElement);
        if (invoker.user === post.author) {
            renderUserButtons(post);
        }
    }

    function renderUserButtons(post) {
        const editButtons = document.createElement('div');
        editButtons.classList.add('edit-Buttons');
        editButtons.appendChild(getEditButton(post));
        editButtons.appendChild(getDeleteButton(post));
        document.getElementById(`title-${post.id}`).appendChild(editButtons);
    }

    function getEditButton(post) {
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerHTML = `
        <i class="material-icons">edit</i>`;
        editButton.addEventListener('click', function (event) {
           event.stopPropagation();
           document.getElementById('mc-id').style.display = "flex";
           const editModal = getEditModal(post);
           editModal.addEventListener('click', function (event) {
               event.stopPropagation();
           });
           document.getElementById('mc-id').appendChild(editModal);
        });
        return editButton;
    }

    function getEditModal(post) {
        const editModal = document.createElement('div');
        editModal.classList.add('modal');
        editModal.innerHTML = `
            <div class = "edit-content">
                <div class="edit-div">
                    <span>Location:</span>
                    <input type="text" name="location" value="${post.location}"/>
                </div>
                <div class="edit-div">
                    <span>Image link:</span>
                    <input type="text" id="img-text-id" value="${post.photoLink}">
                </div>
                <div class="edit-div">
                    <span>Description:</span>
                    <textarea class="description-ed">${post.description}</textarea>
                </div>
                <div class="edit-div">
                    <span>Hashtags:</span>
                    <input type="text" name="hashtags" value="${post.hashtags}"/>
                </div>
                <button class="submit-edit">Save changes</button>
            </div>
            `;
        editModal.children[0].children[4].addEventListener('click', function () {
            const desc = editModal.children[0].children[2].children[1];
            const loc = editModal.children[0].children[0].children[1];
            const photo = editModal.children[0].children[1].children[1];
            const hash = editModal.children[0].children[3].children[1];
            const updatePost = {
                location: loc.value,
                description: desc.value,
                photoLink: photo.value,
                hashtags: hash.value.split(" "),
            };
            postManager.editPhotoPost(post.id, updatePost);
            document.querySelector('.modal-container').style.display = "none";
            document.querySelector('.modal-container').innerHTML = '';
        });
        return editModal;
    }

    function getDeleteButton(post) {
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = `
        <i class="material-icons">delete</i>`;
        deleteButton.addEventListener('click', function (event) {
            event.stopPropagation();
            postManager.removePhotoPost(post.id);
        });
        return deleteButton;
    }

    function removePost(id) {
        const postToRemove = postsContainer.querySelector(`#${getPostId(id)}`);
        postsContainer.removeChild(postToRemove);
        invoker.decreasePostsRendered();
    }

    function editPost(id, newPost) {
        const postToEdit = postsContainer.querySelector(`#${getPostId(id)}`);
        const template = getTemplate(newPost);
        const modalTemplate = getModalTemplate(newPost);
        const updatedPost = getPostElement(template, modalTemplate, newPost.id);
        postsContainer.replaceChild(updatedPost, postToEdit);
        if (invoker.user === newPost.author) {
            renderUserButtons(newPost);
        }
    }

    function addPost(post) {
        const template = getTemplate(post);
        const modalTemplate = getModalTemplate(post);
        const postElement = getPostElement(template, modalTemplate, post.id);
        postsContainer.insertBefore(postElement, postsContainer.getElementsByClassName('post')[0]);
        invoker.increasePostsRendered();
        if (invoker.user === post.author) {
            renderUserButtons(post);
        }
    }


    function getPostId(id) {
        return `post-${id}`;
    }

    function getTemplate(post) {
        return `
            <div class="post-title" id = 'title-${post.id}'>
                <img class="avatar" TODO>
                <div class="title-info">
                    <span class="author">${post.author}</span>
                    <span class="location">${post.location}</span>
                </div>
            </div>
                <div class ="img-container">
                <img class="post-img" src="${post.photoLink}">
                </div>
            <div class="description">
                <span class="info">${post.description}</span>
                <span class="hashtags">${post.hashtags.join(', ')}</span>
                <div class="bottom">
                    <span class="date">${post.createdAt.toLocaleDateString()}</span>
                    <button class="like"><i class="material-icons">thumb_up</i></button>
                </div>
            </div>
        `;
    }

    function getModalTemplate(post) {
        return `
            <div class="post-title" id = 'title-${post.id}'>
                <img class="avatar" TODO>
                <div class="title-info">
                    <span class="author">${post.author}</span>
                    <span class="location">${post.location}</span>
                </div>
            </div>
            <div class ="modal-img-container">
            <img class="modal-post-img" src="${post.photoLink}">
            </div>
            <div class="description">
                <span class="info">${post.description}</span>
                <span class="hashtags">${post.hashtags.join(', ')}</span>
                <div class="bottom">
                    <span class="date">${post.createdAt.toLocaleDateString()}</span>
                    <button class="like"><i class="material-icons">thumb_up</i></button>
                </div>
            </div>
        `;
    }

    function getPostElement(template, modalTemplate, id) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.id = getPostId(id);
        postElement.innerHTML = template;
        postElement.addEventListener('click', function (event) {
            document.getElementById('mc-id').style.display = "flex";
            let postModal = document.createElement('div');
            postModal.classList.add('modal');
            postModal.id = 'modal-id';
            postModal.innerHTML = modalTemplate;
            document.getElementById('mc-id').appendChild(postModal);
            document.getElementById('modal-id').addEventListener('click', function (event1) {
                event1.stopPropagation();
            })
        });
        return postElement;

    }

    return {
        editPost,
        addPost,
        renderPost,
        removePost,
        postsContainer,
        getEditModal
    }
}());