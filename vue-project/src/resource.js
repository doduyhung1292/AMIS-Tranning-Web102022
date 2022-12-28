export const TheHeaderContent = {
    userName: "Nguyễn Văn Mạnh",
    companyName: "CÔNG TY SẢN XUẤT-THƯƠNG MẠI-DỊCH VỤ QUI PHÚC"
};

export const TheSidebarContent = {
    itemOverview: "Tổng quan",
    itemMoney: "Tiền mặt",
    itemBank: "Tiền gửi",
    itemBuy: "Mua hàng",
    itemSell: "Bán hàng",
    itemOrder: "Quản lý hóa đơn",
    itemWarehouse: "Kho",
    itemTools: "Công cụ dụng cụ",
    itemAssets: "Tài sản cố định",
    itemTax: "Thuế",
    itemPrice: "Giá thành",
    itemGeneral: "Tổng hợp",
    itemBudget: "Ngân sách",
    itemReport: "Báo cáo",
    itemFinancial: "Phân tích tài chính"
};

export const TheMainContent = {
    mainContentHeader: {
        btnAddNewEmployee: "Thêm mới nhân viên",
        title: "Nhân viên",
        placeholderSearch: "Tìm theo mã, tên nhân viên",
        titleButtonReload: "Lấy lại dữ liệu",
        titleButtonExportExcel: "Xuất ra excel",
        selected: "Đã chọn ",
        unselect: "Bỏ chọn",
        delete: "Xóa ",
        record: " bản ghi",
        deleteError: "Xóa các bản ghi không thành công."
    },
    mainContentTable: {
        //th column name on table
        employeeId: "MÃ NHÂN VIÊN",
        employeeName: "TÊN NHÂN VIÊN",
        gender: "GIỚI TÍNH",
        dateOfBirth: "NGÀY SINH",
        identityNumber: "SỐ CMND",
        jobPositionName: "CHỨC DANH",
        departmentName: "TÊN ĐƠN VỊ",
        bankAccountNumber: "SỐ TÀI KHOẢN",
        bankName: "TÊN NGÂN HÀNG",
        bankBranchName: "CHI NHÁNH TK NGÂN HÀNG",
        functionTable: "CHỨC NĂNG",

        //th title column name on table
        titleIdentityNumber: "SỐ CHỨNG MINH NHÂN DÂN",
        titleBankBranchName: "CHI NHÁNH TÀI KHOẢN NGÂN HÀNG",
        titleBankAccountNumber: "SỐ TÀI KHOẢN NGÂN HÀNG",

        notFoundRecord: "Không có bản ghi nào được tìm thấy",

        //function on table
        functionOnTable: {
            typeFunction: "Sửa",
            cloneEmployee: "Nhân bản",
            deleteEmployee: "Xóa",
            useEmployee: "Sử dụng"
        }
    },
    mainContentPaging: {
        recordPerPage: "Số bản ghi/ trang",
        total: "Tổng",
        record: "bản ghi",
        numberPerPage: [10, 20, 30, 50, 100]
    }
    
};

export const ToastContent = {
    contentToastDeleteSuccess: "Nhân viên đã được xóa",
    contentToastMassDeleteSuccess: "Các nhân viên đã được xóa",
    contentToastModifySuccess: "Thông tin nhân viên đã được sửa.",
    contentToastSaveSuccess: "Thông tin nhân viên đã được thêm."
};

export const DialogEmployee = {
    //header
    titleDialog: "Thông tin nhân viên",
    titleIconHelp: "Trợ giúp",
    titleIconCloseDialog: "Đóng",
    //label
    employeeId: "Mã",
    employeeName: "Tên",
    departmentName: "Đơn vị",
    jobPositionName: "Chức danh",
    dateOfBirth: "Ngày sinh",
    gender: "Giới tính",
    genderMale: "Nam",
    genderFemale: "Nữ",
    otherGender: "Khác",
    identityNumber: "Số CMND",
    identityDate: "Ngày cấp",
    identityBy: "Nơi cấp",
    address: "Địa chỉ",
    phoneNumber: "ĐT di động",
    telephoneNumber: "ĐT cố định",
    email: "Email",
    bankAccountNumber: "Số tài khoản ngân hàng",
    bankName: "Tên ngân hàng",
    bankBranchName: "Chi nhánh",

    //title
    titleEmployeeId: "Mã nhân viên",
    titleEmployeeName: "Tên nhân viên",
    titleIdentityNumber: "Số Chứng Minh Nhân Dân",
    titleDepartment: "Đơn vị",
    titlePhoneNumber: "Điện thoại di dộng",
    titleTelephoneNumber: "Điện thoại cố định",
    titleDateOfBirth: "Ngày sinh",
    titleBankAccountNumber: "Tài khoản ngân hàng",
    titleIdentityDate: "Ngày cấp chứng minh nhân dân",
    titleEmail: "Email",

    //button

    buttonCacel: "Hủy",
    buttonStore: "Cất",
    buttonSave: "Cất và",

    titleButtonSave: "Bấm Ctrl + Enter để lưu",
    titleButtonClose: "Bấm Esc để đóng",

    // title input invalid
    titleDepartmentInvalid: "Đơn vị không được để trống.",
    titleEmployeeNameInvalid: "Tên nhân viên không được để trống.",
    titleEmployeeIdInvalid: "Mã nhân viên không được để trống.",
    titleBankAccountNumberInvalid: "Số tài khoản ngân hàng không hợp lệ.",
    titleTelephoneNumberInvalid: "Số điện thoại cố định không hợp lệ.",
    titlePhoneNumberInvalid: "Số điện thoại di động không hợp lệ.",
    titleIdentityNumberInvalid: "Số chứng minh nhân dân không hợp lệ.",
    titleDateOfBirthInvalid: "Ngày sinh không hợp lệ",
    titleIdentityDateInvalid: "Ngày cấp chứng minh nhân dân không hợp lệ",
    titleEmailInvalid: "Email không hợp lệ.",

    // title input valid
    titleDepartmentValid: "Đơn vị",
    titleEmployeeNameValid: "Tên nhân viên",
    titleEmployeeIdValid: "Mã nhân viên",
    titleBankAccountNumberValid: "Số tài khoản ngân hàng",
    titleTelephoneNumberValid: "Số điện thoại cố định",
    titlePhoneNumberValid: "Số điện thoại di động",
    titleIdentityNumberValid: "Số chứng minh nhân dân",
    titleDateOfBirthValid: "Ngày sinh",
    titleIdentityDateValid: "Ngày cấp chứng minh nhân dân",
    titleEmailValid: "Email",

    //response error
    serverErrorDefault: 'Đã có lỗi xảy ra, vui lòng liên hệ quản trị viên để biết thêm chi tiết.'
};

export const DialogNotice = {
    titleDialog: "Xác thực dữ liệu",
    buttonCloseDialog: "Đóng",
    titleButtonCloseDialog: "Đóng"
};

export const DialogConfirmStoreResource = {
    titleDialog: "Dữ liệu đã thay đổi",
    contentDialog: "Lưu lại những thay đổi?",
    buttonCloseDialog: "Đóng",
    titleButtonCloseDialog: "Đóng",
    titleButtonNotSave: "Không lưu",
    titleButtonSave: "Lưu",
    buttonNotSave: "Không lưu",
    buttonSave: "Lưu"
};

export const DialogConfirm = {
    titleDialog: "Xóa nhân viên",
    titleButtonCloseDialog: "Đóng",
    buttonCancel: "Hủy bỏ",
    titleButtonCancel: "Hủy bỏ",
    buttonDelete: "Xóa",
    titleButtonDelete: "Xóa",
};

export const ErrorMessage = {
    employeeCodeInvalid: "Mã không được để trống",
    employeeNameInvalid: "Tên không được để trống",
    departmentInvalid: "Đơn vị không được để trống",
    dateOfBirthInvalid: "Ngày sinh không hợp lệ",
    identityDateInvalid: "Ngày cấp không hợp lệ",
    identityNumberInvalid: "Số CMND không hợp lệ",
    phoneNumberInvalid: "ĐT di động không hợp lệ",
    telephoneNumberInvalid: "ĐT cố định không hợp lệ",
    emailInvalid: "Email không hợp lệ",
    bankAccountNumberInvalid: "Số tài khoản không hợp lệ",
};

export const GenderName = {
    male: "Nam",
    female: "Nữ",
    other: "Khác"
};

export const ModeDialogName = {
    addNew: "Thêm",
    modify: "Sửa",
    clone: "Nhân bản",
    delete: "Xóa"
}

export const ConfirmMessage = {
    massDelete: `Bạn có thực sự muốn xóa các nhân viên đã chọn không?`,
    msgConfirmDelete1: `Bạn có thực sự muốn xóa nhân viên <`, 
    msgConfirmDelete2: `> không?`
}