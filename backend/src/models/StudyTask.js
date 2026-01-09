const { pool } = require('../config/database');

class StudyTask {
  static async create(taskData) {
    const { title, subject, deadline, priority, status, user_id } = taskData;
    const [result] = await pool.query(
      `INSERT INTO study_tasks (title, subject, deadline, priority, status, user_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, subject, deadline, priority || 'Medium', status || 'Pending', user_id]
    );
    return result.insertId;
  }

  static async findAllByUser(userId, filters = {}) {
    let query = 'SELECT * FROM study_tasks WHERE user_id = ?';
    const params = [userId];
    
    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }
    
    if (filters.priority) {
      query += ' AND priority = ?';
      params.push(filters.priority);
    }
    
    if (filters.subject) {
      query += ' AND subject = ?';
      params.push(filters.subject);
    }
    
    query += ' ORDER BY deadline ASC, priority DESC';
    
    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async findById(id, userId) {
    const [rows] = await pool.query(
      'SELECT * FROM study_tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return rows[0];
  }

  static async update(id, userId, updates) {
    const allowedFields = ['title', 'subject', 'deadline', 'priority', 'status'];
    const updateFields = [];
    const updateValues = [];
    
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        updateValues.push(updates[field]);
      }
    }
    
    if (updateFields.length === 0) {
      throw new Error('No valid fields to update');
    }
    
    updateValues.push(id, userId);
    
    const [result] = await pool.query(
      `UPDATE study_tasks SET ${updateFields.join(', ')} WHERE id = ? AND user_id = ?`,
      updateValues
    );
    
    return result.affectedRows > 0;
  }

  static async delete(id, userId) {
    const [result] = await pool.query(
      'DELETE FROM study_tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }

  static async getStats(userId) {
    const [rows] = await pool.query(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN status = 'Pending' AND deadline < CURDATE() THEN 1 ELSE 0 END) as overdue,
        SUM(CASE WHEN priority = 'High' AND status = 'Pending' THEN 1 ELSE 0 END) as highPriorityPending
      FROM study_tasks 
      WHERE user_id = ?
    `, [userId]);
    
    return rows[0];
  }
}

module.exports = StudyTask;