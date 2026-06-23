# Stage 1: API Design & Architecture

### Notification Service Endpoints Matrix

| HTTP Method | Route Pathway | Required Headers | Request Payload Body (JSON) | Expected Response (200 OK) |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/notifications/send` | `Authorization: Bearer <token>` | `{"studentID": 1047, "type": "Placement", "message": "..."}` | `{"status": "success", "notificationID": "..."}` |
| `GET` | `/api/v1/notifications/:studentID` | `Authorization: Bearer <token>` | *None* | `{"notifications": [{"id": "...", "type": "Result"}]}` |
| `PATCH` | `/api/v1/notifications/:id/read` | `Authorization: Bearer <token>` | *None* | `{"status": "updated", "isRead": true}` |

---

# Stage 2: Database Schema Selection

## 1. Storage Tier Architectural Evaluation: SQL vs. NoSQL

| Evaluation Metrics | Relational Databases (e.g., PostgreSQL) | NoSQL Databases (e.g., MongoDB) |
| :--- | :--- | :--- |
| **Data Consistency** | **Strong ACID Compliance:** Guarantees absolute transactional consistency when updating read/unread flags. | **Eventual Consistency:** Risk of slight propagation delays across distributed replica clusters. |
| **Schema Flexibility** | **Rigid Structured Tables:** Requires strict definitions. Perfect for enforcing notification types and constraints. | **Dynamic Schemas:** Document-based storage makes it easy to add arbitrary payload structures per message type. |
| **Query Relationships** | Highly efficient at utilizing relational foreign keys to join `notifications` onto a master `students` table. | Requires application-level manual referencing or computationally expensive aggregation lookups. |
| **Scalability Profile** | Scales vertically via connection pooling and replication; read paths scale through highly tailored compound indexes. | Scales horizontally effortlessly via native sharding across vast partitions of unstructured documents. |

**Final Architectural Decision:** **PostgreSQL** is selected as the primary storage layer. Because notification tracking features demand absolute accuracy for read/unread state updates and robust integration with existing relational campus student data records, structural constraint enforcement outweighs high-velocity horizontal scaling.

## 2. Production Database Schema Design (DDL)

```sql
-- Enforce a standardized enum constraint for acceptable notification categories
CREATE TYPE notification_category AS ENUM ('Placement', 'Result', 'Event');

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id INT NOT NULL,
    category notification_category NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);