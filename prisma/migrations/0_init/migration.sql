-- CreateTable
CREATE TABLE "feedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" VARCHAR,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "menu" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "restaurant_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "price" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "customer_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "status" VARCHAR NOT NULL,
    "total_price" INTEGER NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_item" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "order_id" UUID NOT NULL,
    "menu_item_id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "order_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "promotion" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "restaurant_id" UUID NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,

    CONSTRAINT "promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR NOT NULL,
    "location" VARCHAR NOT NULL,
    "contact_info" VARCHAR NOT NULL,
    "operating_hours" VARCHAR NOT NULL,
    "owner_id" UUID NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL,
    "role" VARCHAR NOT NULL,

    CONSTRAINT "staff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roq_user_id" VARCHAR NOT NULL,
    "tenant_id" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "menu" ADD CONSTRAINT "menu_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_menu_item_id_fkey" FOREIGN KEY ("menu_item_id") REFERENCES "menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_item" ADD CONSTRAINT "order_item_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "promotion" ADD CONSTRAINT "promotion_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

