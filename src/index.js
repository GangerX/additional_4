module.exports = function multiply(first, second) {
  var i;
  var z;
  var first_ms = [];//место хранения первого числа
  var second_ms = [];//место хранения второго числа
  var transfer;//перенос на следующий разряд
  var temporary_sum = [];//результат первого перемножения и, впоследствии, промежуточная сумма/конечная сумма
  var proisv = [];//результат очередного перемножения первого числа на составляющую второго
  var len = 0;//для хранения наибольшей из длин массивов temporary_sum и proisv
  first_ms = first.split('');
  second_ms = second.split('');
  first_ms.reverse();
  second_ms.reverse();
  for(i = 0; i < second_ms.length; i++)//проход по второму массиву осуществляестя лишь после перемножения итерационного числа через весь первый массив
  {
    transfer = 0

    for(z = 0; z < first_ms.length; z++)//проход по первому массиву и поэлементное перемножение
    {
      if(i == 0)//если идёт первое перемножение
      {
        temporary_sum.push((((+(second_ms[i]))*(+(first_ms[z])) + transfer))%10);//остаток от деления записываем в новую ячейку
        transfer = Math.floor((((+(second_ms[i]))*(+(first_ms[z])) + transfer))/10);//новый перенос в произведении
      }
      else
      {
          proisv.push((((+(second_ms[i]))*(+(first_ms[z])) + transfer))%10);//остаток от деления записываем в новую ячейку
          transfer = Math.floor((((+(second_ms[i]))*(+(first_ms[z])) + transfer))/10);//новый перенос в произведении
      }
    }


    if(transfer > 0)//если после умножения на конечный разряд первого числа остался перенос, то заносим его в новую ячейку
    {
      if(i == 0)//если идёт первое перемножение
      {
        temporary_sum.push(transfer);
      }
      else
      {
        proisv.push(transfer);
      }
    }
    for(var zeros = 0; zeros < i; zeros++)//записывает перед очередным числом в proisv[] определённое количество нулей, соответствующих разряду умножаемой составляющей в second_ms[]
    {
      proisv.splice(0,1, 0, ...proisv.splice(0, proisv.length));
    }
///////////////////////////////////////////////////////////////////алгоритмы ниже работают исправно
    if(i != 0)//для суммирования
    {
      if(temporary_sum.length < proisv.length)//если длина proisv.length больше чем temporary_sum.length, то в temporary_sum.length надо докинуть нули в конец массива(начало числа)
      {
        for(z = temporary_sum.length; z < proisv.length; z++)
        {
            temporary_sum.push(0);
        }
      }
      else//если наоборот
      {
        for(z = proisv.length; z < temporary_sum.length; z++)
        {
            proisv.length.push(0);
        }
      }

      transfer = 0;
      for(z = 0; z < temporary_sum.length; z++)//теперь надо сложить два наших числа в новое, конечно, если это непервая итерация(i != 0)
      {
        temporary_sum.push((temporary_sum[0] + proisv[0] + transfer)%10);
        transfer = Math.floor((temporary_sum[0] + proisv[0] + transfer)/10)//новый перенос в произведении
        temporary_sum.splice(0,1);
        proisv.splice(0,1);
      }

      if(transfer > 0)
      {
        temporary_sum.push(transfer);
      }
    }
  }

  return temporary_sum.reverse().join('');
}
