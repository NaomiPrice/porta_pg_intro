$(document).ready(onReady);

function onReady() {
    getMusicData();
    $('#add').on('click', postMusicData);
}

// get artist data from the server
function getMusicData() {
    $("#musicTableBody").empty();
    $.ajax({
        type: 'GET',
        url: '/musicLibrary'
    }).then(function (response) {
        console.log("skjfhsd", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#musicTableBody').append(`
                <tr data-id = ${response[i].id}>
                    <td>${response[i].artist}</td>
                    <td>${response[i].track}</td>
                    <td>${response[i].rank}</td>
                    <td>${response[i].published}</td>
                    <td><button class="deleteThis">Delete</button></td>
                    <td>
                        <button class="rank">+</button>
                        <button class="rank">-</button>
                    </td>
                </tr>
            `);
        }
        $('.deleteThis').on('click', deleteBtn);
        $('.rank').on('click', updateRank);
        
    });
}

function updateRank(){
    let direction = $(this).text();
    let songId = $(this).parent().parent().data('id');
    console.log(direction);
    $.ajax({
        type: 'PUT',
        url: `/musicLibrary/rank/${songId}`,
        data: {direction: direction},
    }).then(function(response){
        console.log(response);
        getMusicData();
    }).catch(function(err){
        alert('error in put request client side', err);
    })
}



function deleteBtn(){
    let songId = $(this).parent().parent().data('id');
    console.log('delete button clicked', songId);
    $.ajax({
        type: 'DELETE',
        url: `/musicLibrary/${songId}`,
    }).then(function (response){
        console.log(response);
        getMusicData();
    }).catch(function (error){
        console.log('error:', error);
    })
}

function postMusicData() {
    let payloadObject = {
        artist: $('#artist').val(),
        track: $('#track').val(),
        rank: $('#rank').val(),
        published: $('#published').val()
    }
    $.ajax({
        type: 'POST',
        url: '/musicLibrary',
        data: payloadObject
    }).then( function (response) {
        $('#artist').val(''),
        $('#track').val(''),
        $('#rank').val(''),
        $('#published').val('')
        getMusicData();
    });
}