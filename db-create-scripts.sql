-- БАЗОВАЯ СТРУКТУРА БД

-- ТАБЛИЦЫ
CREATE TABLE project (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    project_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE character (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    portrait_filename VARCHAR(255)
);

CREATE TABLE line (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    line_text TEXT NOT NULL,
    character_id INTEGER,
    in_project_order INTEGER NOT NULL,
    scene_id INTEGER,
    in_scene_order INTEGER 
);

CREATE TABLE scene (
    id SERIAL PRIMARY KEY,
    project_id INTEGER NOT NULL,
    picture_filename VARCHAR(255) NOT NULL
);


-- ВНЕШНИЕ КЛЮЧИ
ALTER TABLE character 
  ADD CONSTRAINT fk_character_project 
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE;

ALTER TABLE line 
  ADD CONSTRAINT fk_line_project 
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_line_scene 
    FOREIGN KEY (scene_id) REFERENCES scene(id) ON DELETE SET NULL,
  ADD CONSTRAINT fk_line_character 
    FOREIGN KEY (character_id) REFERENCES character(id) ON DELETE SET NULL;

ALTER TABLE scene 
  ADD CONSTRAINT fk_scene_project 
    FOREIGN KEY (project_id) REFERENCES project(id) ON DELETE CASCADE;


-- ИНДЕКСЫ
CREATE INDEX idx_character_project_id ON character(project_id);
CREATE INDEX idx_line_project_id ON line(project_id);
CREATE INDEX idx_line_character_id ON line(character_id);