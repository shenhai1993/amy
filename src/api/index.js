/**
 * @desc 手机号解码
 * @param { String } workerId
 */
export function getPhone(data) {
    return  uni.$u.http.post('/auth/exchange_user_phone', {...data})
}

/**
 * @desc 手机号解码
 * @param {} 
 */
export function getAuthMe(data) {
    return  uni.$u.http.post('/auth/me', {...data})
}


/**
 * @desc 登录
 * @param {  } 
 */
export function loginAuth(data) {
    return  uni.$u.http.post('/auth/login', {...data})
}

/**
 * @desc 获取课程列表
 * @param { Number } type 1 当前课程 2 历史课程
 */
export function getClassesList(data) {
    return  uni.$u.http.post('/classes/list', {...data})
}

/**
 * @desc 获取职工信息
 * @param
 */
export function getBaseUser(data) {
    return  uni.$u.http.post('/api_base/get_user', {...data})
}

/**
 * @desc 获取学校
 * @param
 */
export function getBaseSchool(data) {
    return  uni.$u.http.post('/api_base/get_school', {...data})
}

/**
 * @desc 退出登录
 * @param
 */
export function logout() {
    return  uni.$u.http.post('/auth/logout')
}

/**
 * @desc 巡检列表
 * @param
 */
export function getInspectorList(data) {
    return  uni.$u.http.post('/classes/inspector_classes', {...data})
}

/**
 * @desc 班级列表
 * @param
 */
export function getInspectorGradesList(data) {
    return  uni.$u.http.post('/classes/inspector_grades', {...data})
}


/**
 * @desc 老师列表
 * @param
 */
export function getTeachersList(data) {
    return  uni.$u.http.post('/classes/teachers_by_grades', {...data})
}

/**
 * @desc 签到
 * @param {Number} classId 课程id
 */
export function onSign(data) {
    return  uni.$u.http.post('/classes/sign', {...data})
}

/**
 * @desc 结算列表
 * @param {} 
 */
export function getSettledList() {
    return  uni.$u.http.post('/classes/settled_classes')
}

/**
 * @desc 结算
 * @param {Number} classId 课程id
 */
export function postClassesSettled(data) {
    return  uni.$u.http.post('/classes/settle', {...data})
}

/**
 * @desc 问卷列表
 * @param {} 
 */
export function getQuestions(data) {
    return  uni.$u.http.post('/questions/list', {...data})
}

/**
 * @desc 修改个人资料
 * @param {} 
 */
export function editUsers(data) {
    return  uni.$u.http.post('/users/update', {...data})
}

/**
 * @desc 注册
 * @param {} 
 */
export function register(data) {
    return  uni.$u.http.post('/users/register', {...data})
}

/**
 * @desc 提交问卷
 * @param {} 
 */
export function postQuestionsRecord(data) {
    return  uni.$u.http.post('/questions/record', {...data})
}

/**
 * @desc 提交问卷
 * @param {} 
 */
export function postinsPectorComment(data) {
    return  uni.$u.http.post('/classes/inspector_comment', {...data})
}

/**
 * @desc 获取签到列表
 * @param {Number} classld 课程id
 */
export function getSignLogs(data) {
    return  uni.$u.http.post('/classes/get_sign_logs', {...data})
}