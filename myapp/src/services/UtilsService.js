import BaseApiService from "./BaseApiService";

class UtilsService extends BaseApiService {
  calculateDayOfWeekIndex(currentDay) {
    let indexNumber = 0;
    if (currentDay === 0) {
      //Sunday
      indexNumber = 6;
    } else if (currentDay === 1) {
      //Monday
      indexNumber = 0;
    } else if (currentDay === 2) {
      //Tuesday
      indexNumber = 1;
    } else if (currentDay === 3) {
      //Wednesday
      indexNumber = 2;
    } else if (currentDay === 4) {
      //Thursday
      indexNumber = 3;
    } else if (currentDay === 5) {
      //Friday
      indexNumber = 4;
    } else if (currentDay === 6) {
      //Satutrday
      indexNumber = 5;
    }
    return indexNumber;
  }

  getMonth(currentMonth) {
    if (currentMonth === 0) {
      return "Jan";
    } else if (currentMonth === 1) {
      return "Feb";
    } else if (currentMonth === 2) {
      return "Mar";
    } else if (currentMonth === 3) {
      return "Apr";
    } else if (currentMonth === 4) {
      return "May";
    } else if (currentMonth === 5) {
      return "Jun";
    } else if (currentMonth === 6) {
      return "Jul";
    } else if (currentMonth === 7) {
      return "Aug";
    } else if (currentMonth === 8) {
      return "Sep";
    } else if (currentMonth === 9) {
      return "Oct";
    } else if (currentMonth === 10) {
      return "Nov";
    } else if (currentMonth === 11) {
      return "Dec";
    }
    return "Jan";
  }

  // Takes in a Start Date (Date Obj) and End Date (Date Obj)
  /** 
   * Gives Out an Object
   * Day obj:  {
        sundays: 26,
        saturdays: 26,
        totalDays: 182,
        totalWithoutSaturdays: 156,
        totalWithoutSundays: 156,
        totalWithoutSatAndSun: 130
  }
   * 
  */
  getTotalDaysBetweenIncSatAndSun(startDate, endDate) {
    let startDateFromParam = new Date(startDate);
    let endDateFromParam = new Date(endDate);
    var totalSundays = 0;
    var totalSaturdays = 0;
    var totalWithoutSaturdays = 0;
    var totalWithoutSundays = 0;
    var totalWithoutSatAndSun = 0;
    var totalDays = 0;
    for (
      var i = startDateFromParam;
      i <= endDateFromParam;
      i.setDate(i.getDate() + 1)
    ) {
      if (i.getDay() === 0) totalSundays++;
      if (i.getDay() === 6) totalSaturdays++;
      totalDays = totalDays + 1;
    }
    totalWithoutSaturdays = totalDays - totalSaturdays;
    totalWithoutSundays = totalDays - totalSundays;
    totalWithoutSatAndSun = totalDays - (totalSaturdays + totalSundays);
    return {
      sundays: totalSundays,
      saturdays: totalSaturdays,
      totalDays: totalDays,
      totalWithoutSaturdays: totalWithoutSaturdays,
      totalWithoutSundays: totalWithoutSundays,
      totalWithoutSatAndSun: totalWithoutSatAndSun,
    };
  }
}

export default new UtilsService();
