package com.example.auctionapp.api;

import com.example.auctionapp.model.User;
import com.example.auctionapp.payload.UserUpdateRequest;
import com.example.auctionapp.service.UserService;
import org.easymock.Capture;
import org.easymock.EasyMockRunner;
import org.easymock.EasyMockSupport;
import org.easymock.Mock;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static org.easymock.EasyMock.capture;
import static org.easymock.EasyMock.expect;
import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(EasyMockRunner.class)
public class UserControllerTest extends EasyMockSupport {

    @Mock
    UserService userService;

    UserController userController;

    @Before
    public void setUp(){
        userController = new UserController();
        userController.userService = userService;
    }

    @Test
    public void test_updateUser_shouldUpdateUser () {
        Capture<UserUpdateRequest> userUpdateRequestCapture = Capture.newInstance();
        ResponseEntity response = ResponseEntity.ok().body(new User());
        expect(userService.updateUser(capture(userUpdateRequestCapture))).andReturn(response);
        replayAll();
        UserUpdateRequest request = new UserUpdateRequest(1L, "name", "surname", "name-surname@gmail.com", "male",
                LocalDate.now(), "087654321", "photo", 1L, "street", "city", "71000", "state", "country");
        userController.update(request);
        verifyAll();
        UserUpdateRequest sentRequest = userUpdateRequestCapture.getValue();
        assertEquals("name",sentRequest.getName());
    }

}
