$(document).ready(() => {
    console.log("doc ready");
    // $('.submit-button').hover(() => {
    //     $('.submit-button').addClass('hover');
    // }, () => {
    //     $('.submit-button').removeClass('hover');
    // });

    // const handleIn = () => {
    //     $('.submit-button').addClass('hover');
    // }
    // const handleOut = () => {
    //     $('.submit-button').removeClass('hover');
    // }

    // $(".submit-button").hover(handleIn, handleOut);

    $('.question-button').on('click', () => {
        console.log('test');

        // const request = new XMLHttpRequest();
        // request.open('GET', '/getTotalQuestions');
        // request.onreadystatechange = () => {
        //     if (request.readyState === 4 && request.status === 200) {
        //         console.log(request.response);
        //         const response = JSON.parse(request.response);
        //         $(".total-question").text(response.totalQuestion);
        //     } else {
        //         console.log(request.status);
        //     }
        // };
        // request.send();

        $.ajax({
            url: '/getTotalQuestions',
            type: 'GET',
            success: (data, statusCode) => {
                // const response = JSON.parse(data);
                $(".total-question").text(data.totalQuestion);
            },
            error: (xhr, statusCode, error) => {
                console.log(error);
            },
        })
    }); 
});