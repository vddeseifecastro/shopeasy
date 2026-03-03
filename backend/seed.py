from app.database import SessionLocal
from app.models.product import Product

db = SessionLocal()
db.query(Product).delete()
db.commit()

products = [
    # Laptops
    Product(name="MacBook Pro 14\"", description="Chip M3 Pro, 18GB RAM, 512GB SSD, pantalla Liquid Retina XDR", price=1999.99, stock=8, category="Laptops",
            image_url="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop"),
    Product(name="Dell XPS 15", description="Intel Core i7, 16GB RAM, RTX 4060, pantalla OLED 4K", price=1499.99, stock=6, category="Laptops",
            image_url="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop"),

    # Tablets
    Product(name="iPad Pro 12.9\"", description="Chip M2, 256GB, pantalla Liquid Retina XDR, compatible con Apple Pencil", price=1099.99, stock=12, category="Tablets",
            image_url="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop"),
    Product(name="Samsung Galaxy Tab S9", description="Snapdragon 8 Gen 2, 12GB RAM, 256GB, pantalla AMOLED 11\"", price=799.99, stock=10, category="Tablets",
            image_url="https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400&h=300&fit=crop"),

    # Monitores
    Product(name="Monitor LG UltraWide 34\"", description="Panel IPS, 3440x1440, 144Hz, HDR400, USB-C", price=599.99, stock=7, category="Monitores",
            image_url="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop"),
    Product(name="Monitor Samsung 27\" 4K", description="Panel IPS, 4K UHD, 60Hz, HDR10, ajuste de altura", price=379.99, stock=15, category="Monitores",
            image_url="https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=400&h=300&fit=crop"),

    # Teclados
    Product(name="Teclado Mecánico Keychron K2", description="Switches Gateron Brown, layout TKL, retroiluminación RGB, Bluetooth", price=89.99, stock=25, category="Teclados",
            image_url="https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop"),
    Product(name="Logitech MX Keys", description="Teclado inalámbrico premium, retroiluminación adaptativa, multi-dispositivo", price=109.99, stock=20, category="Teclados",
            image_url="https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop"),

    # Ratones
    Product(name="Logitech MX Master 3", description="Mouse inalámbrico ergonómico, sensor 8000 DPI, scroll electromagnético", price=99.99, stock=30, category="Ratones",
            image_url="https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop"),
    Product(name="Razer DeathAdder V3", description="Mouse gaming 30000 DPI, 6 botones programables, cable SpeedFlex", price=69.99, stock=18, category="Ratones",
            image_url="https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400&h=300&fit=crop"),

    # Auriculares
    Product(name="Sony WH-1000XM5", description="Auriculares over-ear, cancelación de ruido líder, 30h batería, multipoint", price=349.99, stock=14, category="Auriculares",
            image_url="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop"),
    Product(name="AirPods Pro 2ª Gen", description="Cancelación activa de ruido, audio espacial, chip H2, resistencia al agua", price=249.99, stock=20, category="Auriculares",
            image_url="https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=300&fit=crop"),
    Product(name="Bose QuietComfort 45", description="Cancelación de ruido adaptativa, 24h batería, plegable, Bluetooth 5.1", price=279.99, stock=9, category="Auriculares",
            image_url="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"),

    # Altavoces
    Product(name="Altavoz JBL Charge 5", description="Bluetooth 5.1, 20h batería, IP67, powerbank integrado, graves potentes", price=179.99, stock=22, category="Altavoces",
            image_url="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop"),

    # Almacenamiento
    Product(name="SSD Samsung 990 Pro 1TB", description="NVMe PCIe 4.0, lectura 7450MB/s, escritura 6900MB/s, formato M.2", price=109.99, stock=35, category="Almacenamiento",
            image_url="https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=300&fit=crop"),
    Product(name="WD My Passport 2TB", description="Disco externo portátil, USB-C, cifrado por hardware, compatible Mac y PC", price=79.99, stock=28, category="Almacenamiento",
            image_url="https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=300&fit=crop"),

    # Cámaras
    Product(name="Webcam Logitech Brio 4K", description="4K Ultra HD, HDR, corrección de iluminación, micrófono dual con reducción de ruido", price=149.99, stock=16, category="Cámaras",
            image_url="https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop"),
    Product(name="GoPro Hero 12 Black", description="Video 5.3K, estabilización HyperSmooth 6.0, sumergible 10m, HDR", price=399.99, stock=11, category="Cámaras",
            image_url="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop"),

    # Móviles
    Product(name="iPhone 15 Pro", description="Titanio, chip A17 Pro, cámara 48MP, Dynamic Island, USB-C, 256GB", price=1199.99, stock=10, category="Móviles",
            image_url="https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop"),
    Product(name="Samsung Galaxy S24 Ultra", description="Snapdragon 8 Gen 3, S Pen integrado, cámara 200MP, 512GB, titanio", price=1299.99, stock=8, category="Móviles",
            image_url="https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop"),

    # Accesorios
    Product(name="Cargador USB-C 100W GaN", description="Tecnología GaN, 4 puertos (2xUSB-C + 2xUSB-A), carga rápida, compacto", price=49.99, stock=40, category="Accesorios",
            image_url="https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop"),
    Product(name="Hub USB-C 7 en 1", description="HDMI 4K, 3xUSB-A, SD/microSD, USB-C PD 100W, aluminio", price=39.99, stock=33, category="Accesorios",
            image_url="https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop"),
    Product(name="Soporte Laptop Ajustable", description="Aluminio, 6 alturas, plegable, compatible 10\"-17\", mejora ergonomía", price=34.99, stock=45, category="Accesorios",
            image_url="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=300&fit=crop"),

    # Mobiliario
    Product(name="Silla Ergonómica Herman Miller", description="Lumbar ajustable, reposabrazos 4D, tejido transpirable, garantía 12 años", price=1449.99, stock=4, category="Mobiliario",
            image_url="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop"),
    Product(name="Mesa Standing Desk 140cm", description="Motorizada, 3 memorias de altura, superficie bambú, rango 70-120cm", price=499.99, stock=6, category="Mobiliario",
            image_url="https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop"),

    # Videojuegos - Consolas
    Product(name="PlayStation 5", description="Consola next-gen, SSD ultrarrápido 1TB, Ray Tracing, 4K 120fps, incluye mando DualSense", price=549.99, stock=5, category="Consolas",
            image_url="https://images.unsplash.com/photo-1607853202273-797f1c22a38e?w=400&h=300&fit=crop"),
    Product(name="Xbox Series X", description="1TB SSD, 4K 120fps, Ray Tracing, retrocompatibilidad completa, Game Pass", price=499.99, stock=6, category="Consolas",
            image_url="https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop"),
    
    # Videojuegos - Mandos
    Product(name="Mando DualSense PS5 Blanco", description="Gatillos adaptativos, retroalimentación háptica, micrófono integrado, USB-C", price=69.99, stock=20, category="Mandos",
            image_url="https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop"),
    Product(name="Mando Xbox Series Negro Eléctrico", description="Bluetooth, USB-C, texturas antideslizantes, compatible PC y móvil", price=59.99, stock=15, category="Mandos",
            image_url="https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400&h=300&fit=crop"),
    
    # Videojuegos - Accesorios Gaming
    Product(name="Teclado Gaming SteelSeries Arctis Nova 7", description="38h batería, retráctil con IA, multi-plataforma", price=149.99, stock=12, category="Gaming",
            image_url="https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=300&fit=crop"),
    Product(name="Silla Gaming Secretlab Titan", description="Cuero PU premium, lumbar magnético, reposacabezas 4D, reclinable 165°", price=679.99, stock=5, category="Gaming",
            image_url="https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop"),

    # Anime
    Product(name="Figura Iron Man 25cm", description="Figura coleccionable PVC alta calidad, base incluida, edición limitada", price=49.99, stock=15, category="Anime",
            image_url="https://images.unsplash.com/photo-1608278047522-58806a6ac85b?w=400&h=300&fit=crop"),
    Product(name="Figura Goku", description="Dragon Ball, PVC premium, efectos de luz LED, base giratoria", price=29.99, stock=10, category="Anime",
            image_url="https://images.unsplash.com/photo-1608278047522-58806a6ac85b?w=400&h=300&fit=crop"),
    Product(name="Camiseta Blanca", description="100% algodón, tallas S-XXL, lavable a máquina", price=24.99, stock=40, category="Deporte",
            image_url="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"),
    Product(name="Mochila Negra", description="Poliéster resistente al agua", price=39.99, stock=20, category="Deporte",
            image_url="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"),

    # Deporte
    Product(name="Balón de Fútbol Adidas Champions League", description="Talla 5, termosoldado, cámara butilo, diseño oficial UEFA, interior y exterior", price=34.99, stock=25, category="Deporte",
            image_url="https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=400&h=300&fit=crop"),
    Product(name="Zapatillas Running Nike Air Zoom", description="Amortiguación React, suela Waffle, transpirable, tallas 38-47, varios colores", price=129.99, stock=20, category="Deporte",
            image_url="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop"),
]

for p in products:
    db.add(p)
db.commit()
db.close()
print(f"✅ {len(products)} productos añadidos correctamente")