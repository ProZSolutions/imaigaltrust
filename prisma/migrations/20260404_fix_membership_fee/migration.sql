-- UpdateData: Extract numeric values from membership_fee strings
UPDATE `memberships` 
SET `membership_fee` = CASE 
    WHEN `membership_fee` LIKE '%1,000%' OR `membership_fee` LIKE '%1000%' THEN '1000'
    WHEN `membership_fee` LIKE '%2,000%' OR `membership_fee` LIKE '%2000%' THEN '2000'
    WHEN `membership_fee` = '' OR `membership_fee` IS NULL THEN '0'
    ELSE REGEXP_SUBSTR(`membership_fee`, '[0-9]+(?:\\.[0-9]{2})?', 1, 1)
END
WHERE `membership_fee` NOT REGEXP '^[0-9]+(\.[0-9]{2})?$';
