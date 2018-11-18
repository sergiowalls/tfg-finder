(() => {

    document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.chips');
        M.Chips.init(elems, {
            onChipSelect: (e, chip) => {console.log(chip.childNodes[0].textContent)},
            onChipAdd: (e, chip) => {
                let chips = M.Chips.getInstance($('.chips')).chipsData.map((x) => x.tag);
                console.log(chips);
            },
            onChipDelete: (e, chip) => {
                let chips = M.Chips.getInstance($('.chips')).chipsData.map((x) => x.tag);
                console.log(chips);
            }
        });
    });

    $('.chips').chips();

    $('.chips-placeholder').chips({
        placeholder: 'Paraules',
        secondaryPlaceholder: '+Paraula',
    });
})();