export const STATUS_ORDER = {
    '1': 'Chờ thanh toán',
    '2': 'Đã thanh toán',
    '3': 'Đang giao hàng',
    '4': 'Hoàn tất',
    '0': 'Đã hủy',
    '11': 'Yêu cầu trả hàng',
    '12': 'Đang trả hàng',
    '13': 'Hoàn tất trả hàng',
}

export const RETURN_STATUS_ORDER = {
    '1': 'Yêu cầu trả hàng',
    '2': 'Đang trả hàng',
    '3': 'Hoàn tất trả hàng',
    '5': 'Hủy yêu cầu trả hàng',
}

export const styleToast = {
    position: "top-right" as any,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored" as any,
};