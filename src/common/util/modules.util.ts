import { Order, OrderSchema } from "src/database/entities/order.schema"
import { OrderItem, OrderItemSchema } from "src/database/entities/order_items.schema"
import { Promotion, PromotionSchema } from "src/database/entities/promotion.schema"
import { Category, CategorySchema } from "../../database/entities/category.schema"
import { Course, CourseSchema } from "../../database/entities/course.schema"
import { Lesson, LessonSchema } from "../../database/entities/lesson.schema"
import { Level, LevelSchema } from "../../database/entities/level.schema"
import { Permission, PermissionSchema } from "../../database/entities/permission.schema"
import { Role, RoleSchema } from "../../database/entities/role.schema"

export const modules = () => {
    return [
        { name: Role.name, schema: RoleSchema },
        { name: Permission.name, schema: PermissionSchema },
        { name: Category.name, schema: CategorySchema },
        { name: Course.name, schema: CourseSchema },
        { name: Lesson.name, schema: LessonSchema },
        { name: Level.name, schema: LevelSchema },
        { name: Order.name, schema: OrderSchema },
        { name: OrderItem.name, schema: OrderItemSchema },
        { name: Promotion.name, schema: PromotionSchema },

    ]
}