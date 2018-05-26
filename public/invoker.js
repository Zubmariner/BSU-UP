
const invoker = (function () {

    let user = 'John Cage';
    let postsRendered = 0;
    const postsAmountToRender = 10;
    let filterConfig = {};


    function addEventListeners() {
        document.getElementById('add-post-button').addEventListener('click', function (event) {
            document.getElementById('mc-id').style.display = "flex";
            const addModal = getAddModal();
            addModal.addEventListener('click', function (event) {
                event.stopPropagation();
            });
            document.getElementById('mc-id').appendChild(addModal);
            document.getElementById('add-submit').addEventListener('click', function (event) {
                const desc = document.getElementById('desc-id');
                const loc = document.getElementById('loc-id');
                const photo = document.getElementById('img-text-id');
                const hash = document.getElementById('hash-id');
                const post = {
                    author: user,
                    location: loc.value,
                    description: desc.value,
                    photoLink: photo.value,
                    hashtags: hash.value.split(" "),
                };
                postManager.addPhotoPost(post);
                document.querySelector('.modal-container').style.display = "none";
                document.querySelector('.modal-container').innerHTML = '';
            });

        });
        document.getElementById('load-more-button').addEventListener('click', function (event) {
            renderMore(filterConfig);
        });
        document.getElementById('mc-id').addEventListener('click', function (event) {
            this.style.display = "none";
            this.innerHTML = '';
        });
        document.getElementById('search-button-id').addEventListener('click', function () {
            postsRendered = 0;
            document.getElementById("#posts-container").innerHTML = '';
            let filterValue = document.getElementById("search-box").value;
            const selector = document.getElementById("search-select");
            if (selector.selectedIndex === 0) {
                filterConfig = {
                    hashtags: filterValue.split(" ")
                }
            }
            if (selector.selectedIndex === 1) {
                filterConfig = {
                    author: filterValue
                }
            }
            if (selector.selectedIndex === 2) {
                filterConfig = {
                    createdAt: filterValue
                }
            }
            renderMore(filterConfig);
        })
        /*document.getElementById('load-more-button').removeEventListener('click', function (event) {
            renderMore();
        });*/
    }

    function renderMore(filterConfig) {
        const postsToTake = postsRendered + postsAmountToRender > postManager.getLength() ?
            postManager.getLength() - postsRendered :
            postsAmountToRender;
        let postsToRender = postManager.getPhotoPosts(filterConfig, postsRendered, postsToTake);
        for (let i = 0; i < postsToTake; i++) {
            if (!postsToRender[i]) {
                console.log('dsajjkdhsajdhsna');
            }
            postRenderer.renderPost(postsToRender[i]);
        }
        postsRendered += postsAmountToRender;
    }

    function increasePostsRendered() {
        postsRendered++;
    }

    function decreasePostsRendered() {
        postsRendered--;
    }

    function showUser() {
        const header = document.getElementById('header');
        let userInfo = document.createElement('span');
        userInfo.classList.add('user-info');
        header.insertBefore(userInfo, header.getElementsByTagName('i')[0]);
        if (!user) {
            userInfo.innerHTML = `Sign up or log in`;
        }
        else {
            userInfo.innerHTML = `Welcome, ${user}!`;
        }
    }

    function getAddModal() {
        const editModal = document.createElement('div');
        editModal.classList.add('modal');
        editModal.innerHTML = `
            <div class = "edit-content">
                <div class="edit-div">
                    <span>Location:</span>
                    <input type="text" name="location" id="loc-id"/>
                </div>
                <div class="edit-div">
                    <span>Image link:</span>
                    <input type="text" id="img-text-id">
                </div>
                <div class="edit-div">
                    <span>Description:</span>
                    <textarea class="description-ed" id="desc-id"></textarea>
                </div>
                <div class="edit-div">
                    <span>Hashtags:</span>
                    <input type="text" name="hashtags" id="hash-id"/>
                </div>
                <button class="submit-edit" id="add-submit">Save changes</button>
            </div>
            `;
        return editModal;
    }

    return {
        showUser,
        user,
        addEventListeners,
        renderMore,
        increasePostsRendered,
        decreasePostsRendered
    }
}());