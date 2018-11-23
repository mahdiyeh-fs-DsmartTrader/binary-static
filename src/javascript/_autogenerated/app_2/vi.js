const texts_json = {};
texts_json['VI'] = {"Connecting_to_server":"Đang kết nối với máy chủ","May":"Tháng Năm","Jan":"Tháng Một","Feb":"Tháng Hai","Mar":"Tháng Ba","Apr":"Tháng 4","Jun":"Tháng Sáu","Jul":"Tháng Bảy","Aug":"Tháng 8","Sep":"Tháng Chín","Oct":"Tháng Mười","Nov":"Tháng Mười Một","Dec":"Tháng 12","Hour":"Giờ","Minute":"Phút","Purchase_Time":"Thời Gian Mua","day":"ngày","days":"ngày","hours":"giờ","minutes":"phút","seconds":"giây","ticks":"tick","Payout":"Khoảng được trả","Stake":"Vốn đầu tư","Duration":"Khoảng thời gian","End_Time":"Thời Gian Kết Thúc","Return":"Doanh thu","Now":"Hiện tại","Rise/Fall":"Tăng/Giảm","Higher/Lower":"Cao Hơn/Thấp Hơn","In/Out":"Trong/Ngoài","Matches/Differs":"Khớp/Khác nhau","Even/Odd":"Hòa vốn/ Số dư","Over/Under":"Trên/Dưới","Up/Down":"Lên/Xuống","Ends_Between/Ends_Outside":"Kết Thúc Giữa / Kết Thúc Ra Ngoài","Touch/No_Touch":"Chạm/Không Chạm","Stays_Between/Goes_Outside":"Nằm Giữa/ Ra Ngoài","Asians":"Châu Á","Potential_Payout":"Khoảng Được Trả Tiềm Năng","Chart":"Biểu đồ","Portfolio":"Hồ sơ","High-Close":"Cao-đóng","Close-Low":"Đóng-Thấp","High-Low":"Cao thấp","Purchase":"Mua","Password_should_have_lower_and_uppercase_letters_with_numbers_":"Mật khẩu nên bao gồm cả chữ hoa, chữ thường và con số.","Invalid_email_address_":"Địa chỉ email không hợp lệ.","Minimum_of_[_1]_characters_required_":"Tối thiểu [_1] các kí tự cần thiết.","Up_to_[_1]_decimal_places_are_allowed_":"Lên đến [_1] chữ số thập phân sau dấu phẩy được cho phép.","years":"năm","Ref_":"Tham khảo.","Resale_not_offered":"Không được bán lại","Date":"Ngày","Action":"Hành động","Your_account_has_no_trading_activity_":"Không có hoạt động giao dịch nào trên tài khoản của bạn.","Today":"Hôm nay","Sell":"Bán","Buy":"Mua","Asian_Up":"Châu á tăng","Asian_Down":"Châu Á Giảm","Digit_Matches":"Số phù hợp","Digit_Differs":"Số khác","Digit_Odd":"Số lẻ","Digit_Even":"Số chẵn","Digit_Over":"Số vượt quá","Digit_Under":"Số dưới","Higher":"Cao Hơn","Higher_or_equal":"Cao Hơn hoặc Bằng","Lower":"Thấp hơn","Lower_or_equal":"Thấp hơn hoặc bằng","Touches":"Chạm","Does_Not_Touch":"Không Chạm","Ends_Between":"Kết Thúc Giữa","Ends_Outside":"Kết Thúc Ra Ngoài","Stays_Between":"Nằm Giữa","Goes_Outside":"Ra Ngoài","Deposit":"Gửi tiền","Withdrawal":"Rút tiền","Start_Time":"Thời gian bắt đầu","Entry_Spot":"Điểm khởi đầu","Barrier":"Giới hạn","Description":"Mô tả","Credit/Debit":"Tín dụng/Ghi nợ","Balance":"Số Dư Tài Khoản","Purchase_Price":"Giá Mua","Profit/Loss":"Lợi Nhuận/Thua Lỗ","Contract_Information":"Thông tin của Hợp đồng","Exit_Spot_Time":"Thời gian chốt","Exit_Spot":"Điểm chốt","Indicative":"Chỉ thị","Your_transaction_reference_number_is_[_1]":"Số tham chiếu giao dịch của bạn là [_1]","Contract_will_be_sold_at_the_prevailing_market_price_when_the_request_is_received_by_our_servers__This_price_may_differ_from_the_indicated_price_":"Hợp đồng sẽ được bán ở giá thị trường hiện hành khi máy chủ nhận được yêu cầu. Giá này có thể khác với giá đã được chỉ định.","Contract_Type":"Loại hợp đồng","Transaction_ID":"ID Giao Dịch","Remaining_Time":"Thời gian còn lại","Should_be_a_valid_number_":"Nên là một số hợp lệ.","Should_be_more_than_[_1]":"Nên là nhiều hơn [_1]","Should_be_less_than_[_1]":"Nên là ít hơn [_1]","Should_be_[_1]":"Nên là [_1]","Should_be_between_[_1]_and_[_2]":"Nên ở giữa [_1] và [_2]","Only_letters,_numbers,_space,_hyphen,_period,_and_apostrophe_are_allowed_":"Chỉ chữ cái, số, khoảng trắng, dấu nối, dấu chấm, và dấu nháy đơn được cho phép.","Only_letters,_space,_hyphen,_period,_and_apostrophe_are_allowed_":"Chỉ chữ cái, khoảng trắng, dấu nối, dấu chấm hết và dấu nháy đơn được cho phép.","Only_numbers_and_spaces_are_allowed_":"Chỉ được phép điền số và khoảng trắng.","The_two_passwords_that_you_entered_do_not_match_":"Hai mật khẩu bạn vừa nhập không khớp với nhau.","[_1]_and_[_2]_cannot_be_the_same_":"[_1] và [_2] không thể giống nhau.","You_should_enter_[_1]_characters_":"Bạn nên nhập vào [_1] ký tự.","The_password_you_entered_is_one_of_the_world's_most_commonly_used_passwords__You_should_not_be_using_this_password_":"Mật khẩu bạn nhập vào là một trong những mật khẩu được sử dụng phổ biến nhất trên thế giới. Bạn không nên sử dụng mật khẩu này.","Hint:_it_would_take_approximately_[_1][_2]_to_crack_this_password_":"Gợi ý: nó sẽ mất khoảng [_1][_2] để crack mật khẩu này.","thousand":"nghìn","million":"triệu","Should_start_with_letter_or_number,_and_may_contain_hyphen_and_underscore_":"Nên bắt đầu bằng chữ hoặc số, và có thể chứa các gạch nối và gạch ngang dưới.","Validate_address":"Xác nhận địa chỉ","[_1]_Account":"[_1] tài khoản","Log_out":"Đăng xuất","General":"Tổng quan","Settings":"Cài đặt","Demo":"Thử nghiệm","Log_in":"Đăng nhập","Trade":"Giao dịch","Statement":"Báo Cáo","Contract_Details":"Chi tiết Hợp đồng","Personal_Details":"Thông Tin Cá Nhân","Financial_Assessment":"Đánh Giá Tài Chính","Account_Password":"Mật Khẩu Tài Khoản","Cashier_Password":"Mật Khẩu Thu Ngân","Self_Exclusion":"Tự Loại trừ","Account_Limits":"Giới hạn Tài khoản","Login_History":"Lịch Sử Đăng Nhập","API_Token":"Mã API Token","No_open_positions_":"Không có vị trí cần tuyển dụng.","Total":"Tổng","Trade_now":"Giao dịch ngay bây giờ","Buy_Price":"Giá mua","Last_Digit_Prediction":"Dự Đoán Chữ số Cuối Cùng","Start_time":"Thời gian bắt đầu","Cancel":"Hủy bỏ","Profile":"Tiểu sử","View_your_personal_information_":"Xem thông tin cá nhân của bạn.","Change_your_main_login_password_":"Thay đổi mật khẩu đăng nhập chính của bạn.","Facility_that_allows_you_to_set_limits_on_your_account_":"Tiện ích cho phép bạn thiết lập giới hạn cho tài khoản của mình.","Limits":"Giới hạn","Multiplier":"Số nhân","Digits":"Chữ số"};