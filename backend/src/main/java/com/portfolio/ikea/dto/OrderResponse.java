package com.portfolio.ikea.dto;

import com.portfolio.ikea.entity.CustomerOrder;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OrderResponse {

    private Long id;
    private String shippingMethod;
    private String shippingDescription;
    private int shippingPrice;
    private int productTotalPrice;
    private int totalPrice;
    private String receiverName;
    private String address;
    private String detailAddress;
    private String status;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;

    public static OrderResponse from(CustomerOrder order) {
        return OrderResponse.builder()
                .id(order.getId())
                .shippingMethod(order.getShippingMethod().getLabel())
                .shippingDescription(order.getShippingMethod().getDescription())
                .shippingPrice(order.getShippingPrice())
                .productTotalPrice(order.getProductTotalPrice())
                .totalPrice(order.getTotalPrice())
                .receiverName(order.getReceiverName())
                .address(order.getAddress())
                .detailAddress(order.getDetailAddress())
                .status(order.getStatus())
                .createdAt(order.getCreatedAt())
                .items(order.getOrderItems().stream().map(OrderItemResponse::from).toList())
                .build();
    }
}
