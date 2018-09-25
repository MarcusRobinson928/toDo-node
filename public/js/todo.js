$(function() {

    render = function() {
        runToDoQuery();
    }
    renderToDo = function(outputElement, dataList) {
        for (let i = 0; i < dataList.length; i++) {
            output = $(outputElement);
            outputType = outputElement;

            listItem = $('<li>')
            .addClass('list-group-item mt-4')
            .attr('id', `${outputType}-${i}`);

            listItem.append(
                $('<p>').text(dataList[i].todo),  
            );

            buttonsDiv = $('<div>').addClass('listButtons');
            
            buttonsDiv.append(
                $('<button>').append('<i class="far fa-square"></i>')
                .addClass('box'),
                $('<button>').append('<i class="fas fa-times"></i>')
                .addClass('x'), 
            );
            output.append(listItem, buttonsDiv);
        }
    }

    renderNewToDo = function(e){
        e.preventDefault()
        newToDo = {
            todo: $('.input').val(),
        };

        for(let key in newToDo){
            if(newToDo[key] === ''){
              alert('Please fill out to do');
              return;
            }
          }
          console.log(newToDo);

          $.ajax({ url: '/api/todo', method: 'POST', data: newToDo}).then(
              function(data) {
                  if (data.success) {
                      console.log('data', data)
                     if (data.toDoList) {
                         alert('Submitted')
                     } 
                     $('.input').val('');
                  }
              })
    };


    runToDoQuery = function() {
        $.ajax({ url: '/api/todo', method: 'GET' })
        .then(function(toDoList){
            renderToDo('.list', toDoList)
        })
    }
    $(document).on('click', '.submit', renderNewToDo)
    render()
});