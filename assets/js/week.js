$('.radio-button').on('change', function() {
    let id = $(this).data('habitid');
    let status = $(this).val();
    let date = $(this).data('date');

    window.location.href = `http://localhost:8000/habits/weeklyView/toggleStatus?id=${id}&status=${status}&date=${date}`;
});
