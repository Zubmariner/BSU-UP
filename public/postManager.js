const postManager = (function () {

    let photoPosts = JSON.parse(localStorage.getItem('data'));
    if (!photoPosts) {
        photoPosts = Posts;
    } else {
        photoPosts.forEach(function (item) {
            item.createdAt = new Date(item.createdAt);
        });
    }
    window.addEventListener('beforeunload', function () {
        if (!photoPosts) {
            localStorage.setItem('data', JSON.stringify(Posts));
        } else {
            localStorage.setItem('data', JSON.stringify(photoPosts));
        }
    });

    let maxId = photoPosts.length + 1;

    function getLength() {
        return photoPosts.length;
    }

    function getPhotoPosts(filterConfig, skip = 0, top = 10) {
        let resultPosts = photoPosts;
        if (filterConfig) {
            if (filterConfig.author) {
                resultPosts = resultPosts.filter(post => post.author === filterConfig.author)
            }

            if (filterConfig.dateBegin && filterConfig.dateBegin instanceof Date) {
                resultPosts = resultPosts.filter(post => post.createdAt >= filterConfig.dateBegin);
            }

            if (filterConfig.dateEnd && filterConfig.dateEnd instanceof Date) {
                resultPosts = resultPosts.filter(post => post.createdAt <= filterConfig.dateEnd);
            }

            if (filterConfig.hashtags) {
                for (let i = 0; i < filterConfig.hashtags.length; i++) {
                    resultPosts = resultPosts.filter(post => post.hashtags.includes(filterConfig.hashtags[i]));
                }
            }
        }
        resultPosts.sort((post1, post2) => post2.createdAt - post1.createdAt);
        return resultPosts.slice(skip, skip + top);
    }

    function getPhotoPost(id) {
        for (let i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id.toString()) {
                return photoPosts[i];
            }
        }
    }

    function validatePhotoPost(photoPost) {
        if (!photoPost) {
            return false;
        }
        if (typeof photoPost.description !== 'string' && photoPost.description.length > 200) {
            return false;
        }
        if (typeof photoPost.author !== 'string' || photoPost.author.length === 0) {
            return false;
        }
        if (typeof photoPost.photoLink !== 'string' || photoPost.photoLink.length === 0) {
            return false;
        }
        if (!photoPost.hashtags) {
            return false;
        }
        return true;
    }

    function addPhotoPost(photoPost) {
        maxId++;
        photoPost.id = (maxId).toString();
        photoPost.createdAt = new Date();
        if (validatePhotoPost(photoPost)) {
            if (photoPosts.some((post) => post.id === photoPost.id)) {
                return false;
            }
            photoPosts.push(photoPost);
            postRenderer.addPost(photoPost);
            return true;
        }
        return false;
    }

    function editPhotoPost(id, photoPost) {
        let temp = getPhotoPost(id);
        if (validateUpdateObject(photoPost)) {
            if (photoPost.location) {
                temp.location = photoPost.location;
            }
            if (photoPost.description) {
                temp.description = photoPost.description;
            }
            if (photoPost.photoLink) {
                temp.photoLink = photoPost.photoLink;
            }
            if (photoPost.hashtags) {
                temp.hashtags = photoPost.hashtags;
            }
            postRenderer.editPost(temp.id, temp);
            return true;
        }
        return false;
    }

    function removePhotoPost(id) {
        if (!id) {
            return false;
        }
        for (let i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id.toString()) {
                photoPosts.splice(i, 1);
                postRenderer.removePost(id);
                return true;
            }
        }
    }

    function validateUpdateObject(updateObj) {
        if (!updateObj) {
            return false;
        }
        if (updateObj.description && (typeof updateObj.description !== 'string' || updateObj.description.length >= 200)) {
            return false;
        }

        if (updateObj.photoLink && (typeof updateObj.photoLink !== 'string' || updateObj.photoLink.length === 0)) {
            return false;
        }
        return true;
    }

    return {
        removePhotoPost,
        addPhotoPost,
        getPhotoPost,
        getPhotoPosts,
        editPhotoPost,
        validatePhotoPost,
        getLength,
        maxId
    };
}());

