console.log(postsFunctions.getPhotoPosts(0, 10));
console.log(postsFunctions.getPhotoPosts({author: 'Johny Dee'}, 0, 10));
console.log(postsFunctions.removePhotoPost('5'));
console.log(postsFunctions.getPhotoPost(5));
console.log(postsFunctions.getPhotoPost('6'));
console.log(postsFunctions.getPhotoPost(7));
console.log(postsFunctions.validatePhotoPost(
    {
        id: '21',
        author: 'Ken Sprouse',
        location: 'UK',
        description: 'Ennerdale Forest, the Lake District',
        createdAt: new Date('2018-02-28'),
        photoLink: 'https://i.redd.it/qgygtg4v1xj01.jpg',
        hashtags: ['#mountain', '#UK', '#forest']
    }
));
console.log(postsFunctions.validatePhotoPost(
    {
        id: '21',
        author: '',
        location: 'UK',
        description: 'Ennerdale Forest, the Lake District',
        createdAt: new Date('2018-02-28'),
        photoLink: 'https://i.redd.it/qgygtg4v1xj01.jpg',
        hashtags: ['#mountain', '#UK', '#forest']
    }
));
console.log(postsFunctions.editPhotoPost('7', {description: 'Edited description'}));
console.log(postsFunctions.getPhotoPost(7));
console.log(postsFunctions.addPhotoPost(
    {
        id: '21',
        author: 'Ken Sprouse',
        location: 'UK',
        description: 'Added post',
        createdAt: new Date('2018-03-04'),
        photoLink: 'https://i.redd.it/qgygtg4v1xj01.jpg',
        hashtags: ['#hashtag', '#anotherone']
    }
));
console.log(postsFunctions.getPhotoPosts({dateBegin: new Date('2018-03-01'), dateEnd: new Date('2018-03-03')}, 0, 20));
console.log(postsFunctions.getPhotoPosts({hashtags: ['#mountain', '#UK']},0, 10));