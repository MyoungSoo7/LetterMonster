package com.lemon.backend.domain.sketchbook.dto.requestDto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SketchbookCreateDto {

    @NotBlank(message = "스케치북 제목은 공백, 띄어쓰기로 만들 수 없습니다.")
//    @Pattern(regexp = "^[^<>'\"&;#　]*$", message = "아래 특수 문자는 사용할 수 없습니다. <, >, ', \", &, ;, #, 　")
    private String name;

//    private Boolean isWritePossible;


}
