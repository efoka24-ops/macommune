#!/bin/bash
# Fichier: api-examples.sh
# Usage: bash api-examples.sh
# Note: Assure-toi que le serveur est en cours d'exécution sur http://localhost:3001

API_URL="http://localhost:3001/api"
ADMIN_EMAIL="admin@macommune.cm"
ADMIN_PASSWORD="ChangeMe123!"
EDITOR_EMAIL="editor@macommune.cm"
EDITOR_PASSWORD="Editor123!"

echo "=========================================="
echo "   API Examples - Shell Script Runner"
echo "=========================================="
echo ""

# Helper function
run_example() {
    local name=$1
    local command=$2
    
    echo ">>> Example: $name"
    echo "Command: $command"
    echo "---"
    eval $command
    echo ""
    echo ""
}

# Example 1: Health Check
run_example "Health Check" \
    "curl -s $API_URL/health | jq ."

# Example 2: Admin Login
echo ">>> Example: Admin Login"
echo "Command: curl -s -X POST $API_URL/auth/login ..."
echo "---"
ADMIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$ADMIN_EMAIL\",
    \"password\": \"$ADMIN_PASSWORD\"
  }")

echo "$ADMIN_RESPONSE" | jq .
ADMIN_TOKEN=$(echo "$ADMIN_RESPONSE" | jq -r '.token')
echo "Token: $ADMIN_TOKEN"
echo ""
echo ""

# Example 3: Verify Token
run_example "Verify Token" \
    "curl -s -X GET $API_URL/auth/verify \
      -H \"Authorization: Bearer $ADMIN_TOKEN\" | jq ."

# Example 4: List Articles
run_example "List All Articles" \
    "curl -s -X GET $API_URL/NewsArticle | jq '.[0:2]'"

# Example 5: Create Article
echo ">>> Example: Create Article"
echo "Command: curl -s -X POST $API_URL/NewsArticle ..."
echo "---"
curl -s -X POST $API_URL/NewsArticle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d "{
    \"title\": \"Nouvelle Article - $(date)\",
    \"content\": \"Contenu créé via script shell\",
    \"excerpt\": \"Résumé court\",
    \"category\": \"terrain\",
    \"canton\": \"figuil\",
    \"published\": true
  }" | jq .
echo ""
echo ""

# Example 6: Get CMS Page
run_example "Get CMS Page (About)" \
    "curl -s -X GET $API_URL/pages/about | jq ."

# Example 7: Update CMS Page
echo ">>> Example: Update CMS Page (Admin Only)"
echo "Command: curl -s -X PUT $API_URL/pages/about ..."
echo "---"
curl -s -X PUT $API_URL/pages/about \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d "{
    \"hero\": \"À Propos de Notre Campagne\",
    \"content\": \"Contenu mis à jour - $(date)\"
  }" | jq .
echo ""
echo ""

# Example 8: Initiate Donation
echo ">>> Example: Initiate Donation"
echo "Command: curl -s -X POST $API_URL/donations/initiate ..."
echo "---"
DONATION_RESPONSE=$(curl -s -X POST $API_URL/donations/initiate \
  -H "Content-Type: application/json" \
  -d "{
    \"amount\": 5000,
    \"phone_number\": \"237699123456\",
    \"donor_name\": \"Jean Dupont\",
    \"message\": \"Support à la campagne\"
  }")

echo "$DONATION_RESPONSE" | jq .
TRANSACTION_ID=$(echo "$DONATION_RESPONSE" | jq -r '.transactionId')
echo ""
echo ""

# Example 9: Verify Donation
run_example "Verify Donation Status" \
    "curl -s -X GET $API_URL/donations/verify | jq ."

# Example 10: Editor Login
echo ">>> Example: Editor Login"
echo "Command: curl -s -X POST $API_URL/auth/login ..."
echo "---"
EDITOR_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$EDITOR_EMAIL\",
    \"password\": \"$EDITOR_PASSWORD\"
  }")

echo "$EDITOR_RESPONSE" | jq .
EDITOR_TOKEN=$(echo "$EDITOR_RESPONSE" | jq -r '.token')
echo "Token: $EDITOR_TOKEN"
echo ""
echo ""

# Example 11: Editor Creates Article
echo ">>> Example: Editor Creates Article"
echo "Command: curl -s -X POST $API_URL/NewsArticle ..."
echo "---"
curl -s -X POST $API_URL/NewsArticle \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $EDITOR_TOKEN" \
  -d "{
    \"title\": \"Article par l'Editeur - $(date)\",
    \"content\": \"Créé par un compte éditeur\",
    \"excerpt\": \"Article éditeur\",
    \"category\": \"reunion\",
    \"canton\": \"lam\",
    \"published\": true
  }" | jq .
echo ""
echo ""

# Example 12: Failed Login (Expected Error)
run_example "Failed Login (Wrong Password)" \
    "curl -s -X POST $API_URL/auth/login \
      -H \"Content-Type: application/json\" \
      -d '{\"email\": \"admin@macommune.cm\", \"password\": \"WrongPassword123\"}' | jq ."

# Example 13: Validation Error (Expected Error)
run_example "Validation Error (Missing Fields)" \
    "curl -s -X POST $API_URL/donations/initiate \
      -H \"Content-Type: application/json\" \
      -d '{\"amount\": 5000}' | jq ."

# Example 14: Unauthorized (Missing Token)
run_example "Unauthorized - Update Page Without Auth" \
    "curl -s -X PUT $API_URL/pages/about \
      -H \"Content-Type: application/json\" \
      -d '{\"content\": \"Contenu\"}' | jq ."

echo "=========================================="
echo "       End of API Examples"
echo "=========================================="
