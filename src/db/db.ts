export type CourseType = {
  id: number;
  title: string;
  studentsCount: number;
}

export type UserType = {
  id: number;
  userName: string;
}

export type UserCourseBindingsType = {
  userId: number;
  courseId: number;
  date: Date;
}

export type DBType = {
  courses: CourseType[];
  users: UserType[];
  usersCourseBindings: UserCourseBindingsType[];
}

const db: DBType = {
  courses: [
    { id: 1, title: 'front-end', studentsCount: 0 },
    { id: 2, title: 'back-end', studentsCount: 0 },
    { id: 3, title: 'automation qa', studentsCount: 0 },
    { id: 5, title: 'devops', studentsCount: 0 },
  ],
  users: [
    { id: 1, userName: 'nikolay' },
    { id: 2, userName: 'ivan' },
  ],
  usersCourseBindings: [
    { userId: 1, courseId: 1, date: new Date(2022, 10, 1) },
    { userId: 1, courseId: 2, date: new Date(2022, 10, 1) },
    { userId: 2, courseId: 2, date: new Date(2022, 10, 1) },
  ]
};

export default db;