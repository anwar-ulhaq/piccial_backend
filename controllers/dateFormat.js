module.exports.dateFormat = (date) => {
    date = date.toString();
    date = date.split(' ');
    let day = date[2];
    let month = date[1];
    let year = date[3];
    let time = date[4];
    time = time.substring(0,5);
    const dateFormatted = day+' '+month+' '+year+' '+time;
    return dateFormatted;
}