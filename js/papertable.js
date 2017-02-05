
var PaperEnum = {
    INDEX: 0,
    TITLE: 1,
    AUTHOR: 2,
    DATE:3,
    CLASS:4,
    PROGRESS:5,
    DATASET:6,
    SAMPLE:7,
    ICON:8,
    URL:9
};

function createTable(arrayTable, tablename) {
    var content = "<tbody>";
    var header = true;
    arrayTable.forEach(function(row) {
        if (header) { header = false; return; } 
        content += "<tr data-status='"+ row[PaperEnum.CLASS] + "'><td><div class='media'>";
        content += "<a href='" + row[PaperEnum.URL] + "' class='pull-left'>";
        content += "<img src='" + row[PaperEnum.ICON] + "' class='media-photo' />";
        content += "</a>";
        content += "<div class='media-body'>";
        content += "<h4 class='title'>";
        content += row[PaperEnum.TITLE];
        content += "</h4>";
        content += "<span class='pull-left pagado' title='" + row[PaperEnum.AUTHOR] +"'>" + row[PaperEnum.CLASS] + "</span>";
        content += "<span class='media-meta pull-right'>" + row[PaperEnum.DATE] + "</span>";
        content += "</div>";
        content += "</div></td></tr>";
    });

    content += "</tbody>";
    document.getElementById(tablename).innerHTML = content;
}

function parseResult(result) {
    var resultArray = [];
    result.split("\n").forEach(function(row) {
        if (row.length == 0) return;
        var rowArray = [];
        row.split(",").forEach(function(cell) {
            rowArray.push(cell);
        });
        resultArray.push(rowArray);
    });

    return resultArray;
}  

function readCSV(filename, tablename) {
    $.get(filename, function(data) {
        var myvar = data;
        var result = parseResult(myvar);
        createTable(result, tablename);
    });
}

$(document).ready(function () {

    $('.star').on('click', function () {
        $(this).toggleClass('star-checked');
    });

    $('.ckbox label').on('click', function () {
        $(this).parents('tr').toggleClass('selected');
    });

    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tr').css('display', 'none').fadeIn('slow');
        }
    });
 });
