(() => {

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.chips');
        M.Chips.init(elems, {
            onChipSelect: (e, chip) => {console.log(chip.childNodes[0].textContent)}
        });
    });

    $('.chips').chips();

    $('.chips-placeholder').chips({
        placeholder: 'Paraules',
        secondaryPlaceholder: '+Paraula',
    });
})();