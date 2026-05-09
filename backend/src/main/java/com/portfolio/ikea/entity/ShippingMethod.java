package com.portfolio.ikea.entity;

import com.portfolio.ikea.exception.InvalidShippingMethodException;

public enum ShippingMethod {
    SAVER("알뜰배송", "문앞까지 비대면 배송", "조립 서비스 이용불가", 29000),
    STANDARD("일반배송", "집안까지 대면 배송", "", 34000),
    CUSTOM("맞춤배송", "지정한 시간에 집안까지 대면배송", "", 39000);

    private final String label;
    private final String description;
    private final String notice;
    private final int price;

    ShippingMethod(String label, String description, String notice, int price) {
        this.label = label;
        this.description = description;
        this.notice = notice;
        this.price = price;
    }

    public String getLabel() {
        return label;
    }

    public String getDescription() {
        return description;
    }

    public String getNotice() {
        return notice;
    }

    public int getPrice() {
        return price;
    }

    public static ShippingMethod from(String value) {
        try {
            return ShippingMethod.valueOf(value);
        } catch (IllegalArgumentException | NullPointerException exception) {
            throw new InvalidShippingMethodException();
        }
    }
}
