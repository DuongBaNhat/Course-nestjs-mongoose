import { Category, CategorySchema } from "../entities/category.schema"
import { Course, CourseSchema } from "../entities/course.schema"
import { Lesson, LessonSchema } from "../entities/lesson.schema"
import { Level, LevelSchema } from "../entities/level.schema"
import { Permission, PermissionSchema } from "../entities/permission.schema"
import { Role, RoleSchema } from "../entities/role.schema"

export const modules = () => {
    return [
        { name: Role.name, schema: RoleSchema },
        { name: Permission.name, schema: PermissionSchema },
        { name: Category.name, schema: CategorySchema },
        { name: Course.name, schema: CourseSchema },
        { name: Lesson.name, schema: LessonSchema },
        { name: Level.name, schema: LevelSchema },
    ]
}