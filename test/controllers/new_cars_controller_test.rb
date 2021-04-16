require "test_helper"

class NewCarsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @new_car = new_cars(:one)
  end

  test "should get index" do
    get new_cars_url
    assert_response :success
  end

  test "should get new" do
    get new_new_car_url
    assert_response :success
  end

  test "should create new_car" do
    assert_difference('NewCar.count') do
      post new_cars_url, params: { new_car: { car_brand_id: @new_car.car_brand_id, car_name: @new_car.car_name, car_specification_id: @new_car.car_specification_id, comments: @new_car.comments, description: @new_car.description, price: @new_car.price, status: @new_car.status } }
    end

    assert_redirected_to new_car_url(NewCar.last)
  end

  test "should show new_car" do
    get new_car_url(@new_car)
    assert_response :success
  end

  test "should get edit" do
    get edit_new_car_url(@new_car)
    assert_response :success
  end

  test "should update new_car" do
    patch new_car_url(@new_car), params: { new_car: { car_brand_id: @new_car.car_brand_id, car_name: @new_car.car_name, car_specification_id: @new_car.car_specification_id, comments: @new_car.comments, description: @new_car.description, price: @new_car.price, status: @new_car.status } }
    assert_redirected_to new_car_url(@new_car)
  end

  test "should destroy new_car" do
    assert_difference('NewCar.count', -1) do
      delete new_car_url(@new_car)
    end

    assert_redirected_to new_cars_url
  end
end
