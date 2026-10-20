import db from '../../db/db.config.js';


/**
 * Send Contact Message & Trigger Telegram Notification
 * ----------------------------------------------------
 * 1. Validates incoming request payload.
 * 2. Persists the contact query into MySQL database.
 * 3. Sends an immediate notification via Telegram Bot API.
 */
export const sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Payload validation
    if (!name || !email || !subject || !message) {
      const error = new Error('All fields (name, email, subject, message) are required.');
      error.statusCode = 400;
      return next(error);
    }

    // 1. Insert user contact message into MySQL database
    const sql = 'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
    await db.query(sql, [name, email, subject, message]);

    // 2. Send real-time notification via Telegram Bot API
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const telegramText = `🚨 *New Portfolio Contact Message*\n\n👤 *Name:* ${name}\n📧 *Email:* ${email}\n📌 *Subject:* ${subject}\n\n💬 *Message:*\n${message}`;
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

      // Asynchronous notification call
      fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
          parse_mode: 'Markdown'
        })
      }).catch((telegramErr) => {
        console.error('Telegram Notification Error:', telegramErr);
      });
    }

    return res.status(201).json({ 
      success: true, 
      msg: 'Message sent and recorded successfully!' 
    });

  } catch (error) {
    next(error); // Passes to Global Express Error Handler
  }
};

/**
 * Add Projects (Automated Seeding with Duplicate Prevention)
 * ----------------------------------------------------------
 * Checks whether each project exists by title before inserting to avoid duplicates.
 */
export const addProjects = async (req, res, next) => {
  try {
    const projects = [
      {
        project_title: 'Evangadi Menu',
        project_description: 'Full-stack food ordering interface built with React, Node.js.',
        project_image_url: 'https://i.ibb.co/pBLnm3VJ/evangadi-menu.png',
        project_github_link: 'https://github.com/Amen-2124/evangadi-menu.git',
        project_live_demo: 'https://serene-pika-b6e6b9.netlify.app'
      },
      {
        project_title: 'Netflix Clone',
        project_description: 'A responsive streaming site clone utilizing TMDB API, React Swiper, and CSS modules.',
        project_image_url: 'https://i.ibb.co/chBppNWB/netflix.png',
        project_github_link: 'https://github.com/Amen-2124/netflix-clone-frontend.git',
        project_live_demo: 'https://shimmering-khapse-637a88.netlify.app'
      },
      {
        project_title: 'ChatGPT Clone',
        project_description: 'A smart conversational web app built with Node.js Express, MySQL, and Google GenAI SDK using Gemini models.',
        project_image_url: 'https://i.ibb.co/bjr6hXhN/chatgpt-clone.png',
        project_github_link: 'https://github.com/Amen-2124/ChatGPT_clone.git',
        project_live_demo: 'https://frabjous-dragon-d505ff.netlify.app'
      },
      {
        project_title: 'Apple Page',
        project_description: 'A dynamic Apple product showcase web application featuring embedded Apple video assets, React Functional Components, custom CSS Modules, and an Express.js with MySQL backend.',
        project_image_url: 'https://i.ibb.co/Wv4K6YCJ/react-apple.png',
        project_github_link: 'https://github.com/Amen-2124/apple-replica',
        project_live_demo: 'https://apple-react-functional-components-git-main-et-4fd7.vercel.app'
      },
      {
        project_title: 'Apple Page (Bootstrap)',
        project_description: 'A sleek, dynamic Apple product showcase page developed using Bootstrap framework for modern, responsive component layouts and styling.',
        project_image_url: 'https://i.ibb.co/TqtkqR2k/Screenshot-2026-10-18-172235.png',
        project_github_link: 'https://github.com/Amen-2124/apple-bootstrap-project2.git',
        project_live_demo: 'https://apple-bootstrap-project2-u7p1.vercel.app'
      },
      {
        project_title: 'AI-form',
        project_description: 'A major collaborative full-stack AI project built using Retrieval-Augmented Generation (RAG) architecture, enabling dynamic document processing, semantic search, and intelligent form handling.',
        project_image_url: 'https://i.ibb.co/84mRXbTs/Screenshot-2026-10-18-090052.png',
        project_github_link: 'https://github.com/Hiwe47/Group1EvangadiForum2026.git',
        project_live_demo: 'https://evanagdi.getenetabebaw.com/'
      }
    ];

    let insertedCount = 0;

    for (const p of projects) {
      // Check if project title already exists
      const [existing] = await db.query(
        'SELECT id FROM projects WHERE project_title = ?', 
        [p.project_title]
      );

      // Insert only if record does not exist
      if (existing.length === 0) {
        const sqlInsert = `
          INSERT INTO projects 
          (project_title, project_description, project_image_url, project_github_link, project_live_demo) 
          VALUES (?, ?, ?, ?, ?)
        `;
        await db.query(sqlInsert, [
          p.project_title,
          p.project_description,
          p.project_image_url,
          p.project_github_link,
          p.project_live_demo
        ]);
        insertedCount++;
      }
    }

    if (insertedCount === 0) {
      return res.status(200).json({ 
        success: true, 
        msg: 'Projects already seeded. No duplicate entries added.' 
      });
    }

    return res.status(201).json({ 
      success: true, 
      msg: `${insertedCount} new project(s) seeded successfully!` 
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get All Projects
 * ----------------
 * Fetches all project records ordered by ID descending.
 */
export const getProjects = async (req, res, next) => {
  try {
    const sqlSelect = "SELECT * FROM projects ORDER BY id DESC";
    const [rows] = await db.query(sqlSelect);
    res.status(200).json({ success: true, projects: rows });
  } catch (err) {
    next(err);
  }
};