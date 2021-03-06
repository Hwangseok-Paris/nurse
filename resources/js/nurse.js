/* nurse javascript 
*  by paris
*  210816
*/

var date = new Date($('#selectedDate').val());
var currentYear = date.getFullYear(); // 연도
var currentMonth = date.getMonth() + 1; // 월
var currentDate = date.getDate(); // 일

var week = new Array('일', '월', '화', '수', '목', '금', '토'); // 요일
var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); // 월별 일수

if (currentYear % 4 == 0 && currentYear % 100 == 0 && currentYear % 400 == 0) {
    lastDate[1] = 29;  // 윤달
}

var printDate = "";
var printDay = "<td colspan=2></td>";
var nurseList = "";


$(function () {
    prepareCalender();
    printDuty();
    dutyCtr();
    printCal();

});


$('#selectedDate').change(function () {
    date = new Date($('#selectedDate').val());
    currentYear = date.getFullYear(); // 연도
    currentMonth = date.getMonth() + 1; // 월
    currentDate = date.getDate(); // 일
    prepareCalender();
    printDuty();
    printCal();
});


function prepareCalender() {
    // 월별 날짜 & 요일
    printDate = "";
    printDate = "<td colspan=2></td>"
    for (var i = 1; i <= lastDate[currentMonth - 1]; i++) {
        date = new Date(currentYear, currentMonth - 1, i);
        var day = date.getDay();
        printDate += "<td class=" + day + ">"
            + '<p class="day' + day + '">'
            + i
            + '</p>'
            + "</td>";
    };


    printDay = "<td colspan=2></td>";
    for (var i = 1; i <= lastDate[currentMonth - 1]; i++) {
        date = new Date(currentYear, currentMonth - 1, i);
        var day = date.getDay();
        printDay += "<td class=" + day + ">" + getday(date) + "</td>";
    };

    // 요일 구하는 함수
    function getday(date) {
        var day = this.date.getDay();
        var koDay = '<p class="day' + day + '">' + week[day] + '</p>';
        return koDay;
    };
}

// console.log(getday());
// console.log(currentYear + "년 " + currentMonth + "월 " + currentDate + '일 ' + getday() + "요일");

function printCal() {

    $('#yearmonth').html(currentYear + "년 " + currentMonth + "월");
    $('#yearmonth').attr("colspan", lastDate[currentMonth + 1]);
    $('#date').html(printDate);
    $('#koDay').html(printDay);
    $('.day0').css('color', 'red').css('background', 'yellow');
    $('.day6').css('color', 'blue');
    $('.duty').html(nurseList);


    var td = $('.nR').children();

    td.each(function (i) {
        if (td.eq(i).text() == 'D') {
            td.eq(i).css('background', 'orange');
        } else if (td.eq(i).text() == 'E') {
            td.eq(i).css('background', 'silver');
        } else if (td.eq(i).text() == 'N') {
            td.eq(i).css('background', 'pink');
        } else if (td.eq(i).text() == 'off') {
            td.eq(i).css('background', 'black').css('color', 'white');
        }
    });
};





// 간호사 명단
var nurse = [
    { name: '김소희', type: 'HN' },
    { name: '강하연', type: 'RN', class: 1 },
    { name: '한가인', type: 'RN', class: 2 },
    { name: '권나연', type: 'RN', class: 3 },
    { name: '유정연', type: 'RN', class: 4 },
    { name: '천수정', type: 'RN', class: 5 },
    { name: '한수민', type: 'RN', class: 6 },

    { name: '고윤희', type: 'NA', class: 1 },
    { name: '박윤정', type: 'NA', class: 2 },
    { name: '고윤희', type: 'NA', class: 3 },
    { name: '이채영', type: 'NA', class: 4 },
    { name: '강민경', type: 'NA', class: 5 },
    { name: '이유림', type: 'NA', class: 6 },
]


var duty = "";
var nurseDuty = "";

// 수간호사 듀티
function headDuty() {
    nurseDuty = "";
    for (var i = 1; i <= lastDate[currentMonth - 1]; i++) {
        date = new Date(currentYear, currentMonth - 1, i);
        var day = date.getDay();
        if (day == 0 || day == 6) {
            duty = 'off';
        } else duty = 'D';
        nurseDuty += "<td>" + duty + "</td>"
    }
}
var dDuty = 0;
var eDuty = 0;
var nDuty = 0;
// 일반간호사 듀티
function cDuty(offday1, offday2, shift1, shift2, shift3) {
    dDuty = 0;
    eDuty = 0;
    nDuty = 0;
    nurseDuty = "";
    for (var i = 1; i <= lastDate[currentMonth - 1]; i++) {
        date = new Date(currentYear, currentMonth - 1, i);
        var day = date.getDay();
        if (i < 8) {
            if (day == offday1 || day == offday2) {
                duty = 'off';
            } else {
                duty = shift1;
                dDuty++;
                if (dDuty > 5) {
                    duty = "Off";
                }
            }
        } else if (i < 15) {
            if (day == offday1 || day == offday2) {
                duty = 'off';
            } else {
                duty = shift2;
                eDuty++;
                if (eDuty > 5) {
                    duty = "off";
                }
            }
        } else if (i < 22) {
            if (day == offday1 || day == offday2) {
                duty = 'off';
            } else {
                duty = shift3;
                nDuty++;
                if (nDuty > 5) {
                    duty = "off";
                }
            }
        } else if (i < 29) {
            if (day == offday1 || day == offday2) {
                duty = 'off';
            } else {
                duty = shift1;
                dDuty++;
                if (dDuty > 12) {
                    duty = "off";
                }
            }
        } else if (i < 32) {
            if (day == offday1 || day == offday2) {
                duty = 'off';
            } else {
                duty = shift2;
                eDuty++;
                if (eDuty > 12) {
                    duty = "off";
                }
            }
        }
        nurseDuty += "<td>" + duty + "</td>"
    }
}


// 휴일, 근무 순서 기준 간호사 근무 생성
function printDuty() {
    nurseList = "";
    weekduty = 0;
    nurse.forEach(function (element, index) {
        if (element.type == 'HN') {
            headDuty();
        } else if (element.type == 'RN') {
            if (element.class == 1) cDuty(0, 5, 'D', 'E', 'N');
            else if (element.class == 2) cDuty(2, 6, 'E', 'N', 'D');
            else if (element.class == 3) cDuty(2, 4, 'N', 'E', 'D');
            else if (element.class == 4) cDuty(4, 5, 'D', 'N', 'E');
            else if (element.class == 5) cDuty(0, 3, 'E', 'D', 'N');
            else if (element.class == 6) cDuty(1, 6, 'N', 'D', 'E');
        } else if (element.type == 'NA') {
            if (element.class == 1) cDuty(0, 4, 'D', 'E', 'N');
            else if (element.class == 2) cDuty(3, 6, 'E', 'D', 'N');
            else if (element.class == 3) cDuty(2, 4, 'N', 'E', 'D');
            else if (element.class == 4) cDuty(4, 5, 'D', 'N', 'E');
            else if (element.class == 5) cDuty(0, 3, 'E', 'N', 'D');
            else if (element.class == 6) cDuty(1, 6, 'N', 'D', 'E');
        }

        nurseList += "<tr class=nR nurse" + index + ">"
            + "<td>" + element.name + "</td>"
            + "<td>" + element.type + "</td>"
            + nurseDuty
            + "</tr>"
    })
}
var dutyCtrl = "";
function dutyCtr() {
    dutyCtrl = "";
    nurse.forEach(function (element, index) {
        dutyCtrl += "<tr class=nR nurse" + index + ">"
            + "<td>" + element.name + "</td>"
            + "<td>" + element.type + "</td>"
            + "</tr>"
    });
};