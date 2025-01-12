import * as bookTypeService from '../services/bookTypeService';

// thêm loại sách
export const addBookTypeController = async (req, res) => {
    const { name, description } = req.body;
    try {
        if (!name) {
            return res.status(400).json({
                err: 1,
                msg: 'Thiếu dữ liệu đầu vào!',
            });
        }

        const result = await bookTypeService.addBookTypeService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Lỗi tại createBookTypeController:', error);
        return res.status(500).json({
            err: 2,
            msg: 'Lỗi server!',
            error: error.message,
        });
    }
};

// sửa loại sách
export const updateBookTypeController = async (req, res) => {
    const { id, name, description } = req.body;
    try {
        if (!id || (!name && !description)) {
            return res.status(400).json({
                err: 1,
                msg: 'Thiếu dữ liệu đầu vào!',
            });
        }

        const result = await bookTypeService.updateBookTypeService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Lỗi tại updateBookTypeController:', error);
        return res.status(500).json({
            err: 2,
            msg: 'Lỗi server!',
            error: error.message,
        });
    }
};

// xóa loại sách
export const deleteBookTypeController = async (req, res) => {
    const { id } = req.body;
    try {
        if (!id) {
            return res.status(400).json({
                err: 1,
                msg: 'Thiếu ID loại sách cần xóa!',
            });
        }

        const result = await bookTypeService.deleteBookTypeService(req.body);
        return res.status(200).json(result);
    } catch (error) {
        console.error('Lỗi tại deleteBookTypeController:', error);
        return res.status(500).json({
            err: 2,
            msg: 'Lỗi server!',
            error: error.message,
        });
    }
};

