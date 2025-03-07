import db from "../models"

// lấy toàn bộ
export const getAllBookTypeService = () => new Promise(async (resolve, reject) => {
    try {
        const bookTypes = await db.BookType.findAll({});

        return resolve({
            err: bookTypes.length ? 0 : 2,
            msg: bookTypes.length ? 'Lấy danh sách loại sách thành công!' : 'Không có loại sách nào.',
            data: bookTypes
        });
    } catch (error) {
        console.error("Lỗi khi lấy danh sách loại sách:", error);
        return reject({
            err: 1,
            msg: 'Lỗi khi lấy danh sách loại sách!',
            error: error,
        });
    }
})

// thêm mới
export const addBookTypeService = async ({ name, tag,  description }) => {
    try {
        // Thêm dữ liệu vào bảng
        const newBookType = await db.BookType.create({
            name : name.trim(),
            tag: tag.trim().toLowerCase(),
            description: description.trim() || null,
        });

        return {
            err: 0,
            msg: 'Thêm loại sách thành công!',
            data: newBookType,
        };
    } catch (error) {
        console.error('Lỗi khi thêm loại sách:', error);
        return {
            err: 2,
            msg: 'Lỗi server!',
            error: error.message,
        };
    }
};

// chinh sửa loại sách 
export const updateBookTypeService = async ({ book_type_id, name, tag,  description }) => {
    try {
        // Tìm bản ghi cần sửa
        const bookType = await db.BookType.findOne({
            where: { book_type_id: book_type_id },
        });

        if (!bookType) {
            return {
                err: 2,
                msg: 'Không tìm thấy loại sách tương ứng!',
            };
        }

        // Cập nhật dữ liệu
        await bookType.update({ name: name.trim(), tag : tag.trim(), description: tag.trim() });

        return {
            err: 0,
            msg: 'Cập nhật loại sách thành công!',
            data: bookType,
        };
    } catch (error) {
        console.error('Lỗi khi cập nhật loại sách:', error);
        return {
            err: 2,
            msg: 'Lỗi server!',
            error: error.message,
        };
    }
};


// xóa loại sách
export const deleteBookTypeService = async ({ book_type_id }) => {
    try {
        // Tìm bản ghi cần xóa
        const bookType = await db.BookType.findOne({
            where: { book_type_id: book_type_id },
        });

        if (!bookType) {
            return {
                err: 2,
                msg: 'Không tìm thấy loại sách tương ứng!',
            };
        }

        // Xóa bản ghi
        await bookType.destroy();

        return {
            err: 0,
            msg: 'Xóa loại sách thành công!',
        };
    } catch (error) {
        console.error('Lỗi khi xóa loại sách:', error);
        return {
            err: 2,
            msg: 'Lỗi server!',
            error: error.message,
        };
    }
};
