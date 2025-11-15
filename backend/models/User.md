# User Schema

-   **username**:
    -   Type: String
    -   Required: true
    -   Unique: true
-   **email**:
    -   Type: String
    -   Required: true
    -   Unique: true
-   **password**:
    -   Type: String
    -   Required: true
-   **role**:
    -   Type: String
    -   Default: 'user'
-   **createdAt**:
    -   Type: Date
    -   Default: Date.now