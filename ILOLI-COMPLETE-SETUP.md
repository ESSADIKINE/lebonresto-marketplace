# Iloli Restaurant - Complete Setup Guide

## 📋 Prerequisites

✅ Owner created with ID: `<SAVE_YOUR_OWNER_ID_HERE>`

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

📝 **Save the returned `id` as CITY_ID**

---

## Step 2: Create Category "Japonais"

**Endpoint**: `POST /categories`

```json
{
  "name": "Japonais",
  "slug": "japonais"
}
```

📝 **Save the returned `id` as CATEGORY_ID**

---

## Step 3: Create Tags (7 requests)

**Endpoint**: `POST /tags`

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

📝 **Save all 7 tag IDs**

---

## Step 4: Create Iloli Restaurant

**Endpoint**: `POST /restaurants`

⚠️ **Replace `<OWNER_ID>`, `<CITY_ID>`, and `<CATEGORY_ID>` with actual IDs**

```json
{
  "owner_id": "<OWNER_ID>",
  "name": "Iloli",
  "description": "Restaurant japonais contemporain à Casablanca, avec cuisine raffinée et ambiance intimiste. Design par Didier Gomez, mêlant influences japonaises et style occidental.",
  "logo_url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/logo-iloli.png",
  "address": "Bd Moulay Youssef, Casablanca 20250, Maroc",
  "latitude": 33.5941,
  "longitude": -7.63,
  "phone": "+212522000999",
  "email": "contact@iloli-restaurant.com",
  "status": "premium",
  "city_id": "<CITY_ID>",
  "category_id": "<CATEGORY_ID>",
  "visit360_url": "https://iloli-restaurant.com/visite-virtuelle",
  "video_url": "https://www.youtube.com/watch?v=SdTBBkvL83o",
  "is_active": true
}
```

📝 **Save the returned restaurant `id` as RESTAURANT_ID**

---

## Step 5: Link Tags to Restaurant (7 requests)

**Endpoint**: `POST /restaurants/{id}/tags/{tagId}`

⚠️ **Replace `{id}` with RESTAURANT_ID and `{tagId}` with each tag ID**

No body needed - just call 7 times:

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

## Step 6: Add Restaurant Images (5 requests)

**Endpoint**: `POST /restaurants/{id}/images`

⚠️ **Replace `{id}` with RESTAURANT_ID**

### Image 1 - Salle principale
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/iloli-salle-principale.jpg",
  "label": "Salle principale - Design contemporain"
}
```

### Image 2 - Comptoir ouvert
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/iloli-comptoir.jpg",
  "label": "Comptoir ouvert sur la cuisine"
}
```

### Image 3 - Terrasse zen
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/iloli-terrasse.jpg",
  "label": "Terrasse zen avec bambou et teck"
}
```

### Image 4 - Mezzanine
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/iloli-mezzanine.jpg",
  "label": "Mezzanine cosy et luxueuse"
}
```

### Image 5 - Plats signature
```json
{
  "url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/iloli-plats.jpg",
  "label": "Sushi et sashimi - Présentation artistique"
}
```

---

## Step 7: Create Menu Entry (with PDF Upload)

**Endpoint**: `POST /menus/upload` (Multipart Form Data)

⚠️ **Use Postman or Swagger for this as it involves file upload**

**Fields**:
- `file`: (Select your PDF file)
- `restaurant_id`: `<RESTAURANT_ID>`
- `title`: "Menu Iloli - Pour les fidèles"
- `description`: "Menu spécial pour les fidèles clients d'Iloli."

This will upload the PDF to Cloudinary and create the menu entry in one go.

---

## Step 10: Add Sample Dishes (Plats)

**Endpoint**: `POST /plats` (or `/menus/plats` depending on your routing)

⚠️ **Replace `<RESTAURANT_ID>` with actual ID**

### Plat 1 - Sushi Assortiment
```json
{
  "restaurant_id": "<RESTAURANT_ID>",
  "name": "Assortiment Sushi Premium",
  "description": "12 pièces de sushi variés avec poissons frais du jour",
  "price": 180,
  "image_url": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
  "is_published": true,
  "is_premium": true
}
```

### Plat 2 - Sashimi
```json
{
  "restaurant_id": "<RESTAURANT_ID>",
  "name": "Sashimi Dégustation",
  "description": "Sélection de sashimi de thon, saumon et daurade",
  "price": 160,
  "image_url": "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56",
  "is_published": true,
  "is_premium": true
}
```

### Plat 3 - Maki California
```json
{
  "restaurant_id": "<RESTAURANT_ID>",
  "name": "California Roll",
  "description": "Maki au crabe, avocat et concombre",
  "price": 85,
  "image_url": "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351",
  "is_published": true,
  "is_premium": false
}
```

### Plat 4 - Tempura
```json
{
  "restaurant_id": "<RESTAURANT_ID>",
  "name": "Tempura de Crevettes",
  "description": "Crevettes et légumes en tempura légère",
  "price": 95,
  "image_url": "https://images.unsplash.com/photo-1606491956689-2ea866880c84",
  "is_published": true,
  "is_premium": false
}
```

### Plat 5 - Ramen
```json
{
  "restaurant_id": "<RESTAURANT_ID>",
  "name": "Ramen Tonkotsu",
  "description": "Bouillon de porc mijoté 12h, nouilles fraîches",
  "price": 110,
  "image_url": "https://images.unsplash.com/photo-1569718212165-3a8278d5f624",
  "is_published": true,
  "is_premium": false
}
```

---

## 📊 Quick Reference Template

Fill this in as you create each item:

```
OWNER_ID: _______________
CITY_ID: _______________
CATEGORY_ID: _______________
TAG_IDs:
  1. Wi-Fi: _______________
  2. Terrasse: _______________
  3. Romantique: _______________
  4. Parking: _______________
  5. Climatisation: _______________
  6. Anniversaire: _______________
  7. Vegan friendly: _______________
RESTAURANT_ID: _______________
DRIVE_FOLDER_ID: _______________ (auto-generated)
PDF_URL: _______________
```

---

## ✅ Checklist

- [ ] Owner created
- [ ] City created
- [ ] Category created
- [ ] 7 Tags created
- [ ] Restaurant created
- [ ] Drive folder created
- [ ] 7 Tags linked
- [ ] 5 Images added
- [ ] PDF uploaded to Drive
- [ ] Menu entry created
- [ ] 5 Plats added

---

## 🎯 Final Result

Once complete, you'll have:
- ✅ Complete Iloli restaurant profile
- ✅ 5 high-quality images
- ✅ 7 tags for filtering
- ✅ PDF menu accessible via Google Drive
- ✅ 5 sample dishes with images
- ✅ Ready for customer browsing!

---

## 💡 Tips

1. **Save IDs as you go** - You'll need them for subsequent requests
2. **Use Swagger UI** - Easier than curl for testing
3. **Check Supabase** - Verify data after each step
4. **PDF Upload** - Make sure the file is publicly accessible
5. **Image URLs** - Using Unsplash for plats, Iloli website for restaurant images

---

## 🚨 Troubleshooting

**400 Error "property should not exist"**:
- Server might not have restarted with new DTOs
- Run: `npm run start:dev` to restart

**404 Not Found**:
- Check that IDs are correct UUIDs
- Verify the endpoint exists in Swagger

**PDF Not Accessible**:
- Ensure Google Drive link is set to "Anyone with link can view"
- Use the `/view` link format, not `/edit`
