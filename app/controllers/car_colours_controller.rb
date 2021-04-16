class CarColoursController < ApplicationController
  before_action :set_car_colour, only: %i[ show edit update destroy ]

  # GET /car_colours or /car_colours.json
  def index
    @car_colours = CarColour.all
  end

  # GET /car_colours/1 or /car_colours/1.json
  def show
  end

  # GET /car_colours/new
  def new
    @car_colour = CarColour.new
  end

  # GET /car_colours/1/edit
  def edit
  end

  # POST /car_colours or /car_colours.json
  def create
    @car_colour = CarColour.new(car_colour_params)
    @all_colour = CarColour.all

    @count = 0
    # logger.info "All colours ::: #{@all_colour.inspect}"

    @colour_typed = (@car_colour.name).downcase
    logger.info "#{@colour_typed}"

    @all_colour.each do |colour|

      @index_colour = (colour.name).downcase

      if @index_colour == @colour_typed

        @count += 1

      end 


      logger.info "#{@index_colour} --- color from loop"

    end 

    logger.info "count before create --- #{@count}"

    respond_to do |format|
      if @count < 1 
        @car_colour.save
        format.html { redirect_to car_colours_path, notice: "Car colour was successfully created." }
        format.json { render :show, status: :created, location: @car_colour }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @car_colour.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /car_colours/1 or /car_colours/1.json
  def update
    respond_to do |format|
      if @car_colour.update(car_colour_params)
        format.html { redirect_to @car_colour, notice: "Car colour was successfully updated." }
        format.json { render :show, status: :ok, location: @car_colour }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car_colour.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /car_colours/1 or /car_colours/1.json
  def destroy
    @car_colour.destroy
    respond_to do |format|
      format.html { redirect_to car_colours_url, notice: "Car colour was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car_colour
      @car_colour = CarColour.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_colour_params
      params.require(:car_colour).permit(:name, :status, :comments)
    end
end
