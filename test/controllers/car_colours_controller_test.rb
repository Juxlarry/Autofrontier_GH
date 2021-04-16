require "test_helper"

class CarColoursControllerTest < ActionDispatch::IntegrationTest
  setup do
    @car_colour = car_colours(:one)
  end

  test "should get index" do
    get car_colours_url
    assert_response :success
  end

  test "should get new" do
    get new_car_colour_url
    assert_response :success
  end

  test "should create car_colour" do
    assert_difference('CarColour.count') do
      post car_colours_url, params: { car_colour: { comments: @car_colour.comments, name: @car_colour.name, status: @car_colour.status } }
    end

    assert_redirected_to car_colour_url(CarColour.last)
  end

  test "should show car_colour" do
    get car_colour_url(@car_colour)
    assert_response :success
  end

  test "should get edit" do
    get edit_car_colour_url(@car_colour)
    assert_response :success
  end

  test "should update car_colour" do
    patch car_colour_url(@car_colour), params: { car_colour: { comments: @car_colour.comments, name: @car_colour.name, status: @car_colour.status } }
    assert_redirected_to car_colour_url(@car_colour)
  end

  test "should destroy car_colour" do
    assert_difference('CarColour.count', -1) do
      delete car_colour_url(@car_colour)
    end

    assert_redirected_to car_colours_url
  end
end
