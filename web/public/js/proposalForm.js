(() => {

    window.goals = [];
    window.keywords = [];

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.chips');
        var instances = M.Chips.init(elems, options);
    });

    $('.chips').chips();

    $('.chips-placeholder').chips({
        placeholder: 'Paraules',
        secondaryPlaceholder: '+Paraula',
    });

    let itemsId = 0;

    window.addGoal = function () {
        let newGoal = $('#goal');
        let itemId = itemsId++;
        let newItem = '<li id="' + itemId + '" class="collection-item"><div>' + newGoal.val() +
            '<a href="#" class="secondary-content"><i class="material-icons waves-effect" onclick="removeGoal(' +
            itemId + ')">delete</i></a></div></li>';
        $('#goals').append(newItem);
        goals.push(newGoal.val());
        newGoal.val('');
        updateAddButton();
    };

    window.removeGoal = function (id) {
        let goal = $('#' + id).val();
        $('#' + id).remove();

        var index = goals.indexOf(goal);
        if (index !== -1) {
            goals.splice(index, 1);
        }
    };

    window.updateAddButton = function () {
        let disabled;
        $('#goal').val() ?
            disabled = false : disabled = true;
        $('#addButton').attr("disabled", disabled);
    };

    window.submitForm = function() {
        const json = {
          title: $('#title').val(),
          description: $('#description').val(),
          goals: window.goals,
          keywords: window.keywords
        };
    
        $.ajax({
          type: 'POST',
          url: 'http://localhost:3000/proposals',
          contentType: 'application/json',
          data: json,
          success: () => {
            window.location.href = "http://localhost:3001/";
          }
        })
      }

})();