const url = "https://api.github.com/users/nilsgova"
const responsePromise = fetch(url, {
    method: 'GET',
    headers: new Headers({
        Authorization: "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"
    })
});

responsePromise
    .then(returnJson)
    .then(displayData)
    .then((userInfo) => fetch(userInfo.repos_url).then(returnJson).then(function(repos){
        displayInfo(repos.length,'repos');
    }))
    .catch(function (err) {
        console.log(err);
    });


    function displayAvatar(data,size) {
        const avatar = document.getElementsByTagName("img")[0];
        avatar.src=data.avatar_url;
        avatar.width = size;
        avatar.height = size;
    }

    function displayInfo(data,id){
        const ellement = document.getElementById(id);
        if(data){
            ellement.innerText = data;
        }
    }


    function returnJson(response) {
        const dataPromise = response.json();
        return dataPromise;
    }

    function displayData(data) {
        displayAvatar(data,"200");
        displayInfo(data.login,"login");
        displayInfo(data.organisation,"organisation");
        return data;
    }