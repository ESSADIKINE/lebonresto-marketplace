# Iloli Restaurant - Ready-to-Use JSON Requests

All IDs are filled in - just copy and paste into Swagger!

---

## Step 1: Create Iloli Restaurant

**Endpoint**: `POST /restaurants`

```json
{
  "owner_id": "62309553-ae24-4adc-9efb-ad3db33507bc",
  "name": "Iloli",
  "description": "Restaurant japonais contemporain à Nador, avec cuisine raffinée et ambiance intimiste. Spécialité burger fusion japonais.",
  "logo_url": "https://www.iloli-restaurant.com/wp-content/uploads/2020/07/logo-iloli.png",
  "address": "Nador, Maroc",
  "latitude": 35.1681,
  "longitude": -2.9331,
  "phone": "+212536000999",
  "email": "contact@iloli-nador.com",
  "status": "standard",
  "city_id": "036e1d4e-3133-4d32-9492-6c817c622022",
  "category_id": "02c7892e-2b38-41b0-8d26-33e8e6f7a288",
  "visit360_url": "https://iloli-restaurant.com/visite_virtuelle/index.html",
  "video_url": "https://www.youtube.com/watch?v=SdTBBkvL83o",
  "is_active": true
}
```

📝 **Save the returned restaurant `id` as RESTAURANT_ID**

---

## Step 2: Link Tags to Restaurant (6 requests)

**Endpoint**: `POST /restaurants/{RESTAURANT_ID}/tags/{tagId}`

⚠️ **Replace `{RESTAURANT_ID}` with your restaurant ID**

### Tag 1 - Sans gluten
```
POST /restaurants/{RESTAURANT_ID}/tags/0845d3ed-5cdb-4fdb-884e-f924a5ca9f65
```

### Tag 2 - Musique live
```
POST /restaurants/{RESTAURANT_ID}/tags/0c0d18f3-7b24-4d7e-9022-6efde908ac1c
```

### Tag 3 - Vue mer
```
POST /restaurants/{RESTAURANT_ID}/tags/0da658e8-098f-469a-b518-755e01d61062
```

### Tag 4 - Famille / enfants
```
POST /restaurants/{RESTAURANT_ID}/tags/13c7fb64-1843-4857-9d8d-74176234979e
```

### Tag 5 - Wi-Fi
```
POST /restaurants/{RESTAURANT_ID}/tags/4ebc54aa-62ac-473f-87df-4e2f4278a5b5
```

### Tag 6 - Halal
```
POST /restaurants/{RESTAURANT_ID}/tags/819edeed-46e4-4d25-a2d0-058d5caa36a1
```

No body needed for any of these - just execute the requests.

---

## Step 3: Add Restaurant Images (5 requests)

**Endpoint**: `POST /restaurants/{RESTAURANT_ID}/images`

⚠️ **Replace `{RESTAURANT_ID}` with your restaurant ID**

### Image 1 - Façade
```json
{
  "url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  "label": "Façade moderne du restaurant"
}
```

### Image 2 - Intérieur
```json
{
  "url": "https://images.unsplash.com/photo-1552566626-52f8b828add9",
  "label": "Salle principale - Ambiance contemporaine"
}
```

### Image 3 - Terrasse
```json
{
  "url": "https://images.unsplash.com/photo-1414235077428-338989a2e8c0",
  "label": "Terrasse avec vue mer"
}
```

### Image 4 - Bar
```json
{
  "url": "https://images.unsplash.com/photo-1572116469696-31de0f17cc34",
  "label": "Bar et comptoir"
}
```

### Image 5 - Burger Signature
```json
{
  "url": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
  "label": "Burger signature fusion japonais"
}
```

---

## Step 4: Create Menu Entry (with PDF Upload)

**Endpoint**: `POST /menus/upload` (Multipart Form Data)

⚠️ **Use Postman or Swagger for this as it involves file upload**

**Fields**:
- `file`: (Select your PDF file)
- `restaurant_id`: `<RESTAURANT_ID>`
- `title`: "Menu Iloli Nador"
- `description`: "Découvrez notre carte de burgers fusion japonais et spécialités maison."

This will upload the PDF to Cloudinary and create the menu entry in one go.

---

## 📊 Summary

### What You'll Create:
- ✅ 1 Restaurant (Iloli - Standard tier)
- ✅ 1 Google Drive folder
- ✅ 6 Tags linked
- ✅ 5 Images
- ✅ 1 Menu with PDF

### IDs Used:
- **City**: Nador (`036e1d4e-3133-4d32-9492-6c817c622022`)
- **Category**: Burger (`02c7892e-2b38-41b0-8d26-33e8e6f7a288`)
- **Owner**: Iloli Group (`62309553-ae24-4adc-9efb-ad3db33507bc`)
- **Tags**: 6 tags (Sans gluten, Musique live, Vue mer, Famille, Wi-Fi, Halal)

### Restaurant Details:
- **Name**: Iloli
- **Type**: Burger restaurant with Japanese fusion
- **Location**: Nador, Morocco
- **Status**: Standard
- **Features**: 360° tour, video, active

---

## ✅ Execution Order

1. Create restaurant → Get RESTAURANT_ID
2. Create Drive folder
3. Link 6 tags (6 API calls)
4. Add 5 images (5 API calls)
5. Upload PDF to Drive manually
6. Create menu entry with PDF URL

**Total API Calls**: 13 requests

---

## 💡 Quick Tips

- **Swagger UI**: Use `http://localhost:3000/api` for easy testing
- **Copy-Paste**: All JSON is ready - just replace `{RESTAURANT_ID}` and `<PDF_URL>`
- **Save IDs**: Keep the restaurant ID handy for steps 3-5
- **PDF Upload**: Do this manually in Google Drive, then use the link in Step 5

---

## 🎯 Expected Result

A complete Iloli restaurant profile in Nador with:
- Standard tier status
- 6 relevant tags for filtering
- 5 professional images
- PDF menu accessible online
- Ready for customers to browse!
