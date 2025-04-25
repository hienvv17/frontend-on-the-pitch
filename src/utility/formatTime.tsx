import moment from "moment";

export const formatTime = (value: moment.Moment | null): moment.Moment | string | null => {
    return moment(value).isValid()
        ? moment(value).format("HH:mm")
        : value
};
