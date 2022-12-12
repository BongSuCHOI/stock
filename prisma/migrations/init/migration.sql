-- CreateTable
CREATE TABLE `Fundamental` (
    `STK_CD` VARCHAR(40) NOT NULL,
    `STK_TD` VARCHAR(40) NULL,
    `STK_CLOSE` INTEGER NULL,
    `STK_VOLUME` INTEGER NULL,
    `issued_share` VARCHAR(40) NULL,
    `cap` VARCHAR(40) NULL,
    `dividend` VARCHAR(40) NULL,
    `div_release_date` VARCHAR(40) NULL,
    `total_revenue` VARCHAR(40) NULL,
    `operating_income` VARCHAR(40) NULL,
    `net_income` VARCHAR(40) NULL,
    `total_assets` VARCHAR(40) NULL,
    `total_liabilities` VARCHAR(40) NULL,
    `total_equity` VARCHAR(40) NULL,

    PRIMARY KEY (`STK_CD`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `STK_OHLCV` (
    `STK_CD` VARCHAR(40) NOT NULL,
    `STK_YEAR` VARCHAR(40) NOT NULL,
    `STK_OPEN` INTEGER NULL,
    `STK_HIGH` INTEGER NULL,
    `STK_LOW` INTEGER NULL,
    `STK_CLOSE` INTEGER NULL,
    `STK_VOLUME` INTEGER NULL,

    PRIMARY KEY (`STK_CD`, `STK_YEAR`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stock_Item` (
    `STK_CD` VARCHAR(40) NOT NULL,
    `STK_NM` VARCHAR(200) NULL,
    `STK_MK` VARCHAR(40) NULL,
    `STK_TD` VARCHAR(40) NOT NULL,

    UNIQUE INDEX `Stock_Item_STK_CD_key`(`STK_CD`),
    PRIMARY KEY (`STK_CD`, `STK_TD`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stock_textdata` (
    `STK_CD` VARCHAR(40) NOT NULL,
    `DATADAY` VARCHAR(40) NULL,
    `title` VARCHAR(40) NOT NULL,
    `content` VARCHAR(40) NULL,
    `DATA_type` VARCHAR(40) NULL,
    `url` VARCHAR(200) NULL,

    INDEX `STK_CD`(`STK_CD`),
    PRIMARY KEY (`title`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_group_permissions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `group_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm`(`permission_id`),
    UNIQUE INDEX `auth_group_permissions_group_id_permission_id_0cd325b0_uniq`(`group_id`, `permission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `content_type_id` INTEGER NOT NULL,
    `codename` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `auth_permission_content_type_id_codename_01ab375a_uniq`(`content_type_id`, `codename`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(128) NOT NULL,
    `last_login` DATETIME(6) NULL,
    `is_superuser` BOOLEAN NOT NULL,
    `username` VARCHAR(150) NOT NULL,
    `first_name` VARCHAR(150) NOT NULL,
    `last_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `is_staff` BOOLEAN NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `date_joined` DATETIME(6) NOT NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_user_groups` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `group_id` INTEGER NOT NULL,

    INDEX `auth_user_groups_group_id_97559544_fk_auth_group_id`(`group_id`),
    UNIQUE INDEX `auth_user_groups_user_id_group_id_94350c0c_uniq`(`user_id`, `group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_user_user_permissions` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `permission_id` INTEGER NOT NULL,

    INDEX `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm`(`permission_id`),
    UNIQUE INDEX `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq`(`user_id`, `permission_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `django_admin_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `action_time` DATETIME(6) NOT NULL,
    `object_id` LONGTEXT NULL,
    `object_repr` VARCHAR(200) NOT NULL,
    `action_flag` SMALLINT UNSIGNED NOT NULL,
    `change_message` LONGTEXT NOT NULL,
    `content_type_id` INTEGER NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `django_admin_log_content_type_id_c4bce8eb_fk_django_co`(`content_type_id`),
    INDEX `django_admin_log_user_id_c564eba6_fk_auth_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `django_content_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `app_label` VARCHAR(100) NOT NULL,
    `model` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `django_content_type_app_label_model_76bd3d3b_uniq`(`app_label`, `model`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `django_migrations` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `app` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `applied` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `django_session` (
    `session_key` VARCHAR(40) NOT NULL,
    `session_data` LONGTEXT NOT NULL,
    `expire_date` DATETIME(6) NOT NULL,

    INDEX `django_session_expire_date_a5c62663`(`expire_date`),
    PRIMARY KEY (`session_key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stock_result` (
    `STK_CD` VARCHAR(40) NOT NULL,
    `STK_YEAR` VARCHAR(20) NULL,
    `STK_RESULT` VARCHAR(40) NULL,

    PRIMARY KEY (`STK_CD`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stockaws_mainappmodel` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `main_intro` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Fundamental` ADD CONSTRAINT `Fundamental_ibfk_1` FOREIGN KEY (`STK_CD`) REFERENCES `Stock_Item`(`STK_CD`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `STK_OHLCV` ADD CONSTRAINT `STK_OHLCV_ibfk_1` FOREIGN KEY (`STK_CD`) REFERENCES `Stock_Item`(`STK_CD`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Stock_textdata` ADD CONSTRAINT `Stock_textdata_ibfk_1` FOREIGN KEY (`STK_CD`) REFERENCES `Stock_Item`(`STK_CD`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_group_permissions` ADD CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_group_permissions` ADD CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_permission` ADD CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_user_groups` ADD CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_user_groups` ADD CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_user_user_permissions` ADD CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `auth_user_user_permissions` ADD CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `django_admin_log` ADD CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `django_admin_log` ADD CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `stock_result` ADD CONSTRAINT `stock_result_ibfk_1` FOREIGN KEY (`STK_CD`) REFERENCES `Stock_Item`(`STK_CD`) ON DELETE NO ACTION ON UPDATE NO ACTION;

