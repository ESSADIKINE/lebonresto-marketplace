# Iloli Restaurant - Swagger Test Data

Use these JSON bodies to manually create the Iloli restaurant data in Swagger UI at `http://localhost:3000/api`

---

## Step 1: Create City "Casablanca"

**Endpoint**: `POST /cities`

```json
{
  "name": "Casablanca",
  "region": "Casablanca-Settat",
  "country": "Morocco"
}
```

📝 **Save the returned `id`**

---

## Step 2: Create Category "Japonais"

**Endpoint**: `POST /categories`

```json
{
  "name": "Japonais",
  "slug": "japonais"
}
```

📝 **Save the returned `id`**

---

## Step 3: Create Tags (7 requests)

**Endpoint**: `POST /tags` (repeat 7 times)

```json
{"name": "Wi-Fi"}
```

```json
{"name": "Terrasse"}
```

```json
{"name": "Romantique"}
```

```json
{"name": "Parking"}
```

```json
{"name": "Climatisation"}
```

```json
{"name": "Anniversaire"}
```

```json
{"name": "Vegan friendly"}
```

📝 **Save all 7 tag `id`s**

---

## Step 4: Create Owner

**Endpoint**: `POST /owners`

```json
{
  "email": "owner.iloli@example.com",
  "password": "StrongPassw0rd!",
  "name": "Iloli Group",
  "phone": "+212612345679",
  "avatar_url": "https://www.cartoonize.net/wp-content/uploads/2024/05/avatar-maker-photo-to-cartoon.png",
  "company_name": "Iloli Restaurant",
  "vat_number": "MA987654321"
}
```

📝 **Save the returned owner `id`**

---

## Step 5: Create Restaurant

**Endpoint**: `POST /restaurants`

⚠️ **Replace `<CITY_ID>` and `<CATEGORY_ID>` with actual IDs from steps 1 & 2**

```json
{
  "name": "Iloli",
  "description": "Restaurant japonais contemporain à Casablanca, avec cuisine raffinée et ambiance intimiste.",
  "address": "Casablanca, Maroc",
  "latitude": 33.5941,
  "longitude": -7.63,
  "phone": "+212522000999",
  "email": "contact@iloli-restaurant.com",
  "status": "basic",
  "city_id": "<CITY_ID>",
  "category_id": "<CATEGORY_ID>",
  "visit360_url": "https://iloli-restaurant.com/visite_virtuelle/index.html",
  "video_url": "https://www.youtube.com/watch?v=SdTBBkvL83o",
  "is_active": true
}
```

📝 **Save the returned restaurant `id`**

---

## Step 6: Link Tags to Restaurant (7 requests)

**Endpoint**: `POST /restaurants/{id}/tags/{tagId}`

⚠️ **Replace `{id}` with restaurant ID and `{tagId}` with each tag ID**

No body needed - just call the endpoint 7 times with each tag ID:

```
POST /restaurants/<RESTAURANT_ID>/tags/<TAG_ID_1>
POST /restaurants/<RESTAURANT_ID>/tags/<TAG_ID_2>
POST /restaurants/<RESTAURANT_ID>/tags/<TAG_ID_3>
POST /restaurants/<RESTAURANT_ID>/tags/<TAG_ID_4>
POST /restaurants/<RESTAURANT_ID>/tags/<TAG_ID_5>
POST /restaurants/<RESTAURANT_ID>/tags/<TAG_ID_6>
POST /restaurants/<RESTAURANT_ID>/tags/<TAG_ID_7>
```

---

## Step 7: Add Restaurant Images (5 requests)

**Endpoint**: `POST /restaurants/{id}/images`

⚠️ **Replace `{id}` with your restaurant ID**

**Image 1**:
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/01.jpg",
  "label": "Salle principale"
}
```

**Image 2**:
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/02.jpg",
  "label": "Détail cuisine"
}
```

**Image 3**:
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/03.jpg",
  "label": "Ambiance de nuit"
}
```

**Image 4**:
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/04.jpg",
  "label": "Table décorée"
}
```

**Image 5**:
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/05.jpg",
  "label": "Vue générale"
}
```

---

## Step 8: Create Menu (with PDF Upload)

**Endpoint**: `POST /menus/upload` (Multipart Form Data)

⚠️ **Use Swagger's "Try it out" button for file upload**

**Fields**:
- `file`: (Select your PDF file)
- `restaurant_id`: `<RESTAURANT_ID>`
- `title`: "Menu pour les fidèles"
- `description`: "Menu spécial pour les fidèles clients d'Iloli."

This will upload the PDF to Cloudinary and create the menu entry.

---

## 📋 Checklist

- [ ] City created
- [ ] Category created
- [ ] 7 Tags created
- [ ] Owner created
- [ ] Restaurant created
- [ ] Drive folder created
- [ ] Tags linked (via SQL)
- [ ] Images added (via SQL)
- [ ] Menu created

---

## 💡 Quick Copy-Paste Template

Keep this template handy and fill in the IDs as you go:

```
CITY_ID: _______________
CATEGORY_ID: _______________
TAG_IDs: 
  1. _______________
  2. _______________
  3. _______________
  4. _______________
  5. _______________
  6. _______________
  7. _______________
OWNER_ID: _______________
RESTAURANT_ID: _______________
DRIVE_FOLDER_ID: _______________
```
