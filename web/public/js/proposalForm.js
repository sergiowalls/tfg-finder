(() => {

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.chips');
        var instances = M.Chips.init(elems, options);
    });

    $('.chips').chips();

    $('.chips-placeholder').chips({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
    });

    let itemsId = 0;

    window.addGoal = function () {
        let newGoal = $('#goal');
        let itemId = itemsId++;
        let newItem = '<li id="' + itemId + '" class="collection-item"><div>' + newGoal.val() +
            '<a href="#" class="secondary-content"><i class="material-icons waves-effect" onclick="removeGoal(' +
            itemId + ')">delete</i></a></div></li>';
        $('#goals').append(newItem);
        newGoal.val('');
        updateAddButton();
    };

    window.removeGoal = function (id) {
        $('#' + id).remove();
    };

    window.updateAddButton = function () {
        let disabled;
        $('#goal').val() ?
            disabled = false : disabled = true;
        $('#addButton').attr("disabled", disabled);
    };

})();