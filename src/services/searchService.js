import db from "../models";

// tìm kiếm gợi ý sản phẩm
export const searchBookSuggestionsService = async ({ key, limit = 5 }) => {
    try {
        const suggestions = await db.Book.findAll({
            where: {
                title: { [db.Sequelize.Op.like]: `%${key}%` } // Tìm sách có title chứa từ khóa
            },
            limit: parseInt(limit, 10),
            attributes: ['book_id', 'title', 'author'] // Giới hạn các trường trả về
        });

        return {
            err: 0,
            msg: "Tìm kiếm gợi ý sách thành công.",
            data: suggestions
        };
    } catch (error) {
        throw new Error("Lỗi khi lấy gợi ý sách: " + error.message);
    }
};

// Tìm kiếm sản phẩm theo từ khóa (tên sách hoặc thể loại)
export const searchBookService = async ({ key }) => {
    try {
        const suggestions = await db.Book.findAll({
            where: {
                [db.Sequelize.Op.or]: [
                    { title: { [db.Sequelize.Op.like]: `%${key}%` } }, // Tìm theo tên sách
                    {
                        '$bookType.tag$': { [db.Sequelize.Op.like]: `%${key}%` } // Tìm theo tag trong BookType
                    },
                    {
                        '$bookType.name$': { [db.Sequelize.Op.like]: `%${key}%` } // Tìm theo name trong BookType
                    }
                ]
            },
            include: [
                {
                    model: db.BookImage,
                    as: "images",
                    attributes: ["image_public_id", "image_path"]
                },
                {
                    model: db.BookType,
                    as: "bookType",
                    attributes: ["name", "tag"],
                    required: false // Giữ LEFT JOIN để không loại bỏ sách nếu không có BookType khớp
                },
                {
                    model: db.WareHouse,
                    as: "warehouses",
                    attributes: ["stock_quantity", "sold_quantity"]
                }
            ],
            order: [["published_date", "DESC"]]
        });

        return {
            err: 0,
            msg: "Tìm kiếm sách thành công.",
            data: suggestions
        };
    } catch (error) {
        console.error("Lỗi tại searchBookService:", error);
        return {
            err: 1,
            msg: "Lỗi khi tìm kiếm sách.",
            error: error.message
        };
    }
};