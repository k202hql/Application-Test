<?php
error_reporting(0);


class Services {  
    
    
    public function __construct() { }

    public function getdata($file){
    if (($handle = fopen($file, "r")) !== FALSE) {
        $csvs = [];
        while(! feof($handle)) {
        $csvs[] = fgetcsv($handle);
        }
        $datas = [];
        $column_names = [];
        foreach ($csvs[0] as $single_csv) {
            $column_names[] = $single_csv;
        }
        foreach ($csvs as $key => $csv) {
            if ($key === 0) {
                continue;
            }
            foreach ($column_names as $column_key => $column_name) {
                $datas[$key-1][$column_name] = $csv[$column_key];
            }
        }
            fclose($handle);
            //$json = json_encode($datas);
            return $datas; 
        }
    }



    public function getById($file, $id){       
        if (($handle = fopen($file, "r")) !== FALSE) { 
            $counter = 0;  
            $csvs = [];
            $csvs[] = fgetcsv($handle);
            foreach ($csvs[0] as $single_csv) {
                $column_names[] = $single_csv;
            }              
            while ( ! feof ( $handle ) )
            {      
                if ( $counter == $id ){
                    break;
                }
                $buffer = fgetcsv ( $handle, 5000 ); 
                ++$counter;
            } 
            foreach ($column_names as $column_key => $column_name) {
                $datas[$column_name] = $buffer[$column_key];
            }               
        }
        fclose($handle);
        return $datas; 
    }



    public function deletedata($id, $file){
        if (($handle = fopen($file, "r")) !== FALSE) {
            $i = 0;
            $newdata = [];
            while (($data = fgetcsv($handle, 5000, ",")) !== FALSE) {      
                if ($i == $id) {
                    $i++;
                    continue;
                }  
                $newdata[$i] = $data;
                $i++;    
            }
            $fp = fopen($file, 'w');    
            foreach ($newdata as $rows) {
                fputcsv($fp, $rows);
            }    
            fclose($fp);
            return $fp;
        }
    }


    public function adddata($file, $postdata){
        
        if (($handle = fopen($file, "a")) === false) {
            die("can't open the file.");
        }
        else{ 
            $request = json_decode($postdata);

            $id =  trim($request->id);
            $name =  trim($request->name);
            $state =  trim($request->state);
            $zip =  trim($request->zip);
            $amount =  trim($request->amount);
            $qty =  trim($request->qty);
            $items =  trim($request->item);
            
            $no_rows = count(file($file));
            if($no_rows > 1) {
                $no_rows = ($no_rows) + 1;
            } 
            $data=array(
                'id'  => $no_rows, 
                'name'  => $name, 
                'state'  =>$state, 
                'zip'  =>$zip, 
                'amount'  =>$amount, 
                'qty'  =>$qty, 
                'item'  =>$items );
            echo($data);
            $ss = fputcsv($handle, $data);      
            // if($ss){
            //     $success = [ 'msg' => 'Successfully Added'];
            // }       
        fclose($handle);
        return  $ss;
        }
    }


function updatedata($file, $postdata){
    $row = 1;	
    $request = json_decode($postdata);

    $id =  trim($request->id);
    $name =  trim($request->name);
    $state =  trim($request->state);
    $zip =  trim($request->zip);
    $amount =  trim($request->amount);
    $qty =  trim($request->qty);
    $items =  trim($request->item);
    
	if (($handle = fopen($file, "r")) !== FALSE) {
        $i = 0;
        $newdata = [];
        while (($data = fgetcsv($handle, 5000, ",")) !== FALSE) {      
            if ($i == $id) {
                $newdata[$i][] = $id;          
                $newdata[$i][] = $name;          
                $newdata[$i][] = $state;   
                $newdata[$i][] = $zip;  
                $newdata[$i][] = $amount;
                $newdata[$i][] = $qty;
                $newdata[$i][] = $items;
                $i++;
                continue;
            }  
            $newdata[$i][] = $data[0];          
            $newdata[$i][] = $data[1];    
            $newdata[$i][] = $data[2];      
            $newdata[$i][] = $data[3];    
            $newdata[$i][] = $data[4];    
            $newdata[$i][] = $data[5];
            $newdata[$i][] = $data[6];
            $i++;    
        }
        $fp = fopen($file, 'w');    
        foreach ($newdata as $rows) {
          $success =  fputcsv($fp, $rows);
        }    
        fclose($fp);
        return $success;
    }
}
  
}
?>