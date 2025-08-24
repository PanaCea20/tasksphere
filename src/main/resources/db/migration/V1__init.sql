CREATE TABLE users (
                       id            BIGSERIAL PRIMARY KEY,
                       email         VARCHAR(320) UNIQUE NOT NULL,
                       password_hash VARCHAR(100) NOT NULL,
                       full_name     VARCHAR(200) NOT NULL,
                       role          VARCHAR(20)  NOT NULL DEFAULT 'USER',
                       created_at    TIMESTAMPTZ  NOT NULL DEFAULT now()
);

CREATE TABLE projects (
                          id          BIGSERIAL PRIMARY KEY,
                          owner_id    BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                          name        VARCHAR(200) NOT NULL,
                          description TEXT,
                          created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tasks (
                       id          BIGSERIAL PRIMARY KEY,
                       project_id  BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
                       title       VARCHAR(200) NOT NULL,
                       status      VARCHAR(30)  NOT NULL DEFAULT 'OPEN',
                       due_date    DATE,
                       created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE time_entries (
                              id          BIGSERIAL PRIMARY KEY,
                              task_id     BIGINT NOT NULL REFERENCES tasks(id) ON DELETE CASCADE,
                              user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                              started_at  TIMESTAMPTZ NOT NULL,
                              minutes     INT NOT NULL CHECK (minutes > 0),
                              note        TEXT
);

CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_time_entries_task ON time_entries(task_id);
